import { useEffect, useState } from "react";
import { getAllPosts } from "../services/posts.service";
import Post from "../components/Post/Post";

const Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getAllPosts().then(setPosts);
    }, []);

    const sortedPosts = [...posts]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 5)
        .reverse();

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Начало</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sortedPosts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Home;
