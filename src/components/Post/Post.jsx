import PropTypes from 'prop-types';
import './Post.css';
import Button from '../Button';
import { dislikePost, likePost } from '../../services/posts.service';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

/**
 * 
 * @param {{ post: { id: string, title: string, content: string, createdOn: object, likedBy: boolean }, togglePostLike: function }} props
 */
export default function Post({ post, togglePostLike }) {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const toggleLike = async () => {
    if (post.likedBy.includes(userData.handle)) {
      dislikePost(userData.handle, post.id);
    } else {
      likePost(userData.handle, post.id);
    }
    togglePostLike(userData.handle, post.id);
  };

  return (
    <div className="post">
      <h4>{post.title} <Button onClick={toggleLike}>{post.likedBy.includes(userData.handle) ? 'Dislike' : 'Like'}</Button></h4>
      <p>{post.content}</p>
      <p>{new Date(post.createdOn).toLocaleDateString('bg-BG')}</p>
      <Button onClick={() => navigate(`/posts/${post.id}`)}>View</Button>
    </div>
  )
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


