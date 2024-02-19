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
import "./SinglePost.css";

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
  }, []);

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
    <div>
      <h1>Публикация</h1>
      <div className="post">
        <div className="single-post-header">
          <span>{post?.createdOn}</span>
          <span>{likeCount} likes</span>
        </div>
        <div className="single-post-content">
          <div id="single-post-left-side">
            <h3>{post?.author}</h3>
            <div id="author-first-and-last-name">
              <span>{author?.firstName || "firstName"}</span>
              <span>{author?.lastName || "lastName"}</span>
            </div>
            <span>
              {(author?.posts && Object.keys(author.posts).length) || 0} posts
            </span>
            <span>{author?.lastName || 0} likes</span>
            <span>{author?.lastName || 0} comments</span>
            <span></span>
          </div>
          <div id="single-post-right-side">
            <span>{post?.title}</span>
            <hr />
            <span>{post?.content}</span>
          </div>
        </div>
        <div className="single-post-footer">
          {addComment ? (
            <div>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={handleAddComment}>Add Comment</Button>
            </div>
          ) : (
            <Button onClick={() => setAddComment(true)}>Comment</Button>
          )}
          {liked ? (
            <Button onClick={toggleDislike}>Dislike</Button>
          ) : (
            <Button onClick={toggleLike}>Like</Button>
          )}
        </div>
      </div>
      {comments && (
        <div id="single-post-comments">
          <h3>Comments</h3>
          {Object.keys(comments).map((key) => (
            <>
            <div key={key} className="comment">
              <span>{comments[key].firstName}</span>
              <span>{comments[key].lastName}</span>
              <span>{comments[key].createdOn}</span>
              <span>{comments[key].content}</span>
              {comments[key].handle === userData?.handle && (
                <Button onClick={() => handleDeleteComment(key)}>Delete</Button>
              )}
            </div>
            <hr />
            </>
          ))}
        </div>
      )}
    </div>
  );
}
