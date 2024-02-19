import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  update,
} from "firebase/database";
import { db } from "../config/firebase-config.js";

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const getAllUsers = async () => {
  const snapshot = await get(ref(db, `users`));

  if (!snapshot.exists()) {
    return [];
  }

  const users = Object.keys(snapshot.val()).map((key) => ({
    id: snapshot.val()[key].uid,
    ...snapshot.val()[key],
    createdOn: new Date(snapshot.val()[key].createdOn).toString(),
    likedPosts: snapshot.val()[key].likedPosts
      ? Object.keys(snapshot.val()[key].likedPosts)
      : [],
  }));

  return users;
};

export const createUserHandle = (firstName, lastName, handle, uid, email) => {
  return set(ref(db, `users/${handle}`), {
    firstName,
    lastName,
    handle,
    uid,
    email,
    createdOn: new Date(),
    likedPosts: {},
    isAdmin: false,
    isBlocked: false,
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};

export const updateBlockedUser = (handle) => {
  const updateUser = {};
  updateUser[`/users/${handle}/isBlocked`] = true;

  return update(ref(db), updateUser);
};

export const updateUnblockedUser = (handle) => {
  const updateUser = {};
  updateUser[`/users/${handle}/isBlocked`] = false;

  return update(ref(db), updateUser);
};

export const updateAdminStatus = async (handle) => {
  console.log(handle);
  const isAdmin = await get(ref(db, `/users/${handle}/isAdmin`));
  const updateUser = {};
  updateUser[`/users/${handle}/isAdmin`] = !isAdmin.val();
  console.log(isAdmin.val());
  return update(ref(db), updateUser);
};

export const updateUserInfo = async (username, prop, value) => {
  await update(ref(db, `users/${username}`), { [prop]: value });
};

export const updateUserPosts = (username, postId, title) => {
  let updatePosts = {};

  get(ref(db, `users/${username}/posts/`)).then((result) => {
    if (result.exists()) {
      updatePosts = { ...result.val() };
    }

    updatePosts[postId] = title;

    return update(ref(db, `users/${username}/posts/`), updatePosts);
  });
};