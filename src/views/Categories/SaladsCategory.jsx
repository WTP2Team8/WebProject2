import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import Post from "../../components/Post/Post";

export default function SaladsCategory() {
    const [posts, setPosts] = useState([]);
    const saladsPosts = posts.filter((post) => post.category === "salads-category");

    useEffect(() => {
        const fetchPosts = async () => {
            const allPosts = await getAllPosts();
            setPosts(allPosts);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Салати</h1>
            <div>
                {saladsPosts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
