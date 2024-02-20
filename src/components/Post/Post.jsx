import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Post.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { dislikePost, likePost } from "../../services/posts.service";
import { db } from "../../config/firebase-config";
import { get, ref } from "firebase/database";

/**
 *
 * @param {{ post: { id: string, author: string, title: string, content: string, createdOn: object, liked: boolean }, togglePostLike: function }} props
 */
export default function Post({ post }) {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (post?.id) {
      getLikedByValue(post.id).then((likedBy) => {
        setLikeCount(likedBy.length);
      });
    }
  }, [post]);

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

  return (
    <div className="bg-red-700 p-4 rounded-lg shadow-md mb-5 ml-5 mr-5">
      <h4 className="text-xl font-bold mb-5">
        {post.title}{" "}
        {userData ? (
          liked ? (
            <Button onClick={toggleDislike}>Не харесвам</Button>
          ) : (
            <Button className="me-auto" onClick={toggleLike}>Харесвам</Button>
          )
        ) : null}
      </h4>
      <p className="text-black-700">{post.content}</p>
      <p className="text-black-500">
        Създаден от {post?.author}
      </p>
      <p className="text--500">
        {new Date(post.createdOn).toLocaleDateString("bg-BG")}
      </p>
      <p className="text-black-500">Likes: {likeCount}</p>{" "}
      {/* Display the like count */}
      <Button
        onClick={() => navigate(`/posts/${post.id}`)}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Прегледай и Коментирай
      </Button>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    createdOn: PropTypes.string,
  }),
  togglePostLike: PropTypes.func,
};

export const getLikedByValue = async (postId) => {
  const snapshot = await get(ref(db, `posts/${postId}/likedBy`));
  if (!snapshot.exists()) {
    return [];
  }

  const likedBy = Object.keys(snapshot.val());

  return likedBy;
};
