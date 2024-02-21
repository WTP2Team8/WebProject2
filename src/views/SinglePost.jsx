import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addCommentPost,
  deleteCommentPost,
  dislikePost,
  getCommentsOfAPost,
  getPostById,
  likePost,
} from "../services/posts.service";
import { getUserByHandle } from "../services/users.service";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "../components/Button";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(null);
  const [addComment, setAddComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    getPostById(id).then((post) => {
      setPost(post);
      console.log(id);
      getCommentsOfAPost(id).then(setComments);
      setLikeCount(post.likedBy.length || 0);
    });
  }, [id]);

  useEffect(() => {
    getUserByHandle(post?.author).then((snapshot) => {
      if (snapshot.exists()) {
        setAuthor(snapshot.val());
      }
    });
  }, [post?.author]);

  const toggleLike = () => {
    likePost(userData.handle, post.id).then(() => {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    });
  };

  const toggleDislike = () => {
    dislikePost(userData.handle, post.id).then(() => {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    });
  };

  const handleAddComment = () => {
    addCommentPost(
      userData.handle,
      post.id,
      comment,
      userData.firstName,
      userData.lastName
    )
      .then(() => {
        setComment("");
        setAddComment(false);
      })
      .then(() => getCommentsOfAPost(id).then(setComments));
  };

  const handleDeleteComment = (commentId) => {
    deleteCommentPost(post.id, commentId, userData.handle).then(() => {
      getCommentsOfAPost(id).then(setComments);
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Публикация</h1>
      <div className="bg-orange rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <span>{post?.createdOn}</span>
          <span>{likeCount} харесвания</span>
        </div>
        <div className="flex">
          <div className="mr-4">
            <h3>{post?.author}</h3>
            <div className="flex items-center mb-2">
              <span>{author?.firstName || "firstName"}</span>
              <span className="mx-2">|</span>
              <span>{author?.lastName || "lastName"}</span>
            </div>
            <span>
              {(author?.posts && Object.keys(author.posts).length) || 0} публикации
            </span>
            <span className="mx-2">|</span>
            <span>{likeCount || 0} харесвания</span>
            <span className="mx-2">|</span>
            <span>{author?.comments || 0} коментара</span>
          </div>
          <div>
            <span className="text-xl font-bold">{post?.title}</span>
            <hr className="my-2" />
            <span>{post?.content}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          {addComment ? (
            <div className="flex">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border border-gray-300 rounded-l px-2 py-1 focus:outline-none"
              />
              <Button onClick={handleAddComment} className="rounded-r">
                Добави коментар
              </Button>
            </div>
          ) : (
            <Button onClick={() => setAddComment(true)}>Коментирай публикацията</Button>
          )}
        </div>
      </div>
      {comments && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Коментари</h3>
          {Object.keys(comments).map((key) => (
            <div key={key} className="bg-green-700 rounded-lg shadow-lg p-4 mt-4">
              <span>{comments[key].firstName}</span>
              <span className="mx-2">|</span>
              <span>{comments[key].lastName}</span>
              <span className="mx-2">|</span>
              <span>{comments[key].createdOn}</span>
              <p className="mt-2">{comments[key].content}</p>
              {comments[key].handle === userData?.handle && (
                <Button onClick={() => handleDeleteComment(key)}>Изтрии публикацията</Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
