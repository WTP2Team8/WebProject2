import { useEffect, useState, useContext } from "react";
import { getAllPosts } from "../services/posts.service.js";
import { AppContext } from "../context/AppContext.jsx";
import Comment from "../components/Comment.jsx";

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const { userData } = useContext(AppContext);

    useEffect(() => {
        getAllPosts().then(setPosts);
    }, []);

    useEffect(() => {
        const comments = posts.flatMap((post) =>
            Object.values(post.comments || {})
                .filter((comment) => comment.handle === userData?.handle)
                .map((comment) => ({ ...comment, postId: post.id }))
        );
        setMyComments(comments);
    }, [posts, userData]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Моите коментари</h1>
            <div className="grid grid-cols-1 gap-4">
                {myComments.map((comment, index) => (
                    <Comment key={index} comment={comment} postId={comment.postId} />
                ))}
            </div>
        </div>
    );
}