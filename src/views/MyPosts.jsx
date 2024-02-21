import { useEffect, useState, useContext } from "react";
import { getAllPosts } from "../services/posts.service.js";
import Post from "../components/Post/Post.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { AppContext } from "../context/AppContext.jsx";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-4">Моите публикации</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts
          .filter((post) => post.author === userData?.handle)
          .map((post) => (
            <Post key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
}
