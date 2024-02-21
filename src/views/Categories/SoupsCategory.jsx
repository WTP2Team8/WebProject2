import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import Post from "../../components/Post/Post";

const SoupsCategory = () => {
    const [posts, setPosts] = useState([]);
    const soupPosts = posts.filter((post) => post.category === "soups-category");

    useEffect(() => {
        const fetchPosts = async () => {
            const allPosts = await getAllPosts();
            setPosts(allPosts);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <div>
                {soupPosts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default SoupsCategory;
