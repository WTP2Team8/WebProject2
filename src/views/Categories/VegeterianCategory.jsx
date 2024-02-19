import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import Post from "../../components/Post/Post";

export default function VegeterianCategory() {
    const [posts, setPosts] = useState([]);
    const vegeterianPosts = posts.filter((post) => post.category === "vegeterian-category");

    useEffect(() => {
        const fetchPosts = async () => {
            const allPosts = await getAllPosts();
            setPosts(allPosts);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Вегетариански</h1>
            <div>
                {vegeterianPosts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
