import PropTypes from 'prop-types';
import CreatePost from './Posts';

const SinglePostView = ({ post }) => {
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {<CreatePost />}
        </div>
    );
};

export default SinglePostView;

SinglePostView.propTypes = {
        post: PropTypes.object.isRequired,
};
