import PropTypes from "prop-types";
import "./Post.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import { dislikePost, likePost } from "../../services/posts.service";

/**
 *
 * @param {{ post: { id: string, title: string, content: string, createdOn: object, liked: boolean }, togglePostLike: function }} props
 */
export default function Post({ post }) {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likedBy.length); // Initialize the like count

  // console.log(post);

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
    <div className="post">
      <h4>
        {post.title}{" "}
        {liked ? (
          <Button onClick={toggleDislike}>Dislike</Button>
        ) : (
          <Button onClick={toggleLike}>Like</Button>
        )}
      </h4>
      <p>{post.content}</p>
      <p>Създаден от --- {userData?.handle}</p>
      <p>{new Date(post.createdOn).toLocaleDateString("bg-BG")}</p>
      <p>Likes: {likeCount}</p> {/* Display the like count */}
      <Button onClick={() => navigate(`/posts/${post.id}`)}>View</Button>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    createdOn: PropTypes.string,
    likedBy: PropTypes.array,
  }),
  togglePostLike: PropTypes.func,
};
