import { useEffect, useState } from "react";
import { getAllPosts, likePost } from "../services/posts.service";
import Post from "../components/Post/Post";
import "./AllPosts.css";
import SearchBar from "../components/SearchBar";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <div >
      <h1>Всички публикации</h1>
        <SearchBar/>
        {posts.map((post) => (
          <Post key={post.id} post={post}/>
        ))}
    </div>
  );
}
