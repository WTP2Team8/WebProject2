import {
  ref,
  push,
  get,
  query,
  orderByChild,
  update,
  remove,
  set,
} from "firebase/database";
import { db } from "../config/firebase-config";
import { updateUserPosts } from "./users.service";

export const addPost = async (author, title, content) => {
  const result = await push(ref(db, "posts"), {
    author,
    title,
    content,
    createdOn: Date.now().toString(),
    comments: {},
    likes: 0,
  });

  await updateUserPosts(author, result.key, title);
};

export const getAllPosts = async () => {
  const snapshot = await get(
    query(ref(db, "posts"), orderByChild("createdOn"))
  );

  if (!snapshot.exists()) {
    return [];
  }

  const posts = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
    createdOn: new Date(snapshot.val()[key].createdOn).toString(),
    likedBy: snapshot.val()[key].likedBy
      ? Object.keys(snapshot.val()[key].likedBy)
      : [],
  }));

  return posts;
};

export const getPostsBySearchTerm = async (search) => {
  const snapshot = await get(
    query(ref(db, "posts"), orderByChild("createdOn"))
  );
  if (!snapshot.exists()) {
    return [];
  }

  const posts = Object.keys(snapshot.val())
    .map((key) => ({
      id: key,
      ...snapshot.val()[key],
      createdOn: new Date(snapshot.val()[key].createdOn).toString(),
      likedBy: snapshot.val()[key].likedBy
        ? Object.keys(snapshot.val()[key].likedBy)
        : [],
    }))
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  console.log(posts);

  return posts;
};

export const getPostById = async (id) => {
  const snapshot = await get(ref(db, `posts/${id}`));
  if (!snapshot.exists()) {
    return null;
  }

  const post = {
    id,
    ...snapshot.val(),
    createdOn: new Date(snapshot.val().createdOn).toString(),
    likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
  };

  return post;
};

export const likePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = true;

  return update(ref(db), updateLikes);
};

export const deletePost = (postId) => {
  return remove(ref(db, `/posts/${postId}`));
};

export const dislikePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = null;

  return update(ref(db), updateLikes);
};

export const addCommentPost = async (
  username,
  postId,
  comment,
  firstName,
  lastName
) => {
  try {
    const commentKey = push(ref(db, `/posts/${postId}/comments`));
    const result = await get(ref(db, `/users/${username}/comments`));
    const newCommentCount = result.val() + 1;
    await update(ref(db, `/users/${username}`), { comments: newCommentCount });

    return set(commentKey, {
      handle: username,
      firstName: firstName,
      lastName: lastName,
      content: comment,
      createdOn: new Date().toString(),
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCommentPost = async (postId, commentId, username) => {
  try {
    const commentToDelete = ref(db, `/posts/${postId}/comments/${commentId}`);
    const result = await get(ref(db, `/users/${username}/comments`));
    await update(ref(db, `/users/${username}`), { comments: result.val() - 1 });
    const commentsToDeleteInUser = ref(
      db,
      `/users/${username}/allComments/${commentId}`
    );
    await remove(commentsToDeleteInUser);
    return remove(commentToDelete);
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsOfAPost = async (id) => {
  console.log(id);

  try {
    const result = await get(ref(db, `posts/${id}/comments`));

    if (!result.exists()) {
      throw new Error(`Post with id ${id} does not exist!`);
    }

    const comments = result.val();
    console.log(comments);
    return comments;
  } catch (error) {
    console.error(error);
  }
};
