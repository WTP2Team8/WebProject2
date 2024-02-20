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
        <div>
            <h1>Начало</h1>
            {sortedPosts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Home;
