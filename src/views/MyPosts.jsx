import { useEffect, useState, useContext} from "react";
import { getAllPosts } from "../services/posts.service.js";
import Post from "../components/Post/Post.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { AppContext } from "../context/AppContext.jsx";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const { userData} = useContext(AppContext);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <div>
      <h1>Моите публикации</h1>
      {posts
        .filter((post) => post.author === userData?.handle) 
        .map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
}
