import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Comment({ comment, postId }) {
    return (
        <div className="bg-amber-500 rounded-lg shadow-lg p-4 mt-4">
            <span>{comment.firstName}</span>
            <span className="mx-2">|</span>
            <span>{comment.lastName}</span>
            <span className="mx-2">|</span>
            <span>{comment.createdOn}</span>
            <p className="mt-2">{comment.content}</p>
            <Link to={`/posts/${postId}`}>
                <Button>Към публикацията</Button>
            </Link>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
};
