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
          <h1 className="font-sans font-bold text-2xl my-5 py-2 text-black rounded-lg">
            Супи
          </h1>
    
          <div className="grid grid-cols-1 gap-4">
            {soupPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      );
};

export default SoupsCategory;
