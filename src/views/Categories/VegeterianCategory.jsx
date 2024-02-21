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
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {vegeterianPosts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
