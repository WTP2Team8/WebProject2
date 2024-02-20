import { useEffect, useState } from "react";
import { getAllPosts, likePost } from "../services/posts.service";
import Post from "../components/Post/Post";
import SearchBar from "../components/SearchBar";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Всички публикации</h1>
      <SearchBar/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Post key={post.id} post={post}/>
        ))}
      </div>
    </div>
  );
}
