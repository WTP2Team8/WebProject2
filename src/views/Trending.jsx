import { useEffect, useState } from "react";
import { getAllPosts } from "../services/posts.service";
import Post from "../components/Post/Post";

const Trending = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  const sortedPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 10)
    .reverse();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Най-актуални</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
