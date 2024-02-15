import PropTypes from 'prop-types';
import './Post.css';
import Button from '../Button';
import {  qlikePost } from '../../services/posts.service';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

/**
 * 
 * @param {{ post: { id: string, title: string, content: string, createdOn: object, liked: boolean }, togglePostLike: function }} props
 */
export default function Post({ post, togglePostLike }) {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const toggleLike = async () => {
    if (post.likedBy.includes(userData.handle)) {
      togglePostLike(userData.handle, post.id);
    } 
    
  };

  const likeCount = post.likedBy.length; // Add this line to get the like count

  return (
    <div className="post">
      <h4>
        {post.title}{' '}
        <Button onClick={toggleLike}>
          Like
        </Button>
      </h4>
      <p>{post.content}</p>
      <p>Създаден от --- {userData.handle}</p>
      <p>{new Date(post.createdOn).toLocaleDateString('bg-BG')}</p>
      <p>Likes: {likeCount}</p> {/* Add this line to display the like count */}
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

