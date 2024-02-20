import { useEffect, useState } from "react";
import { getAllPosts } from "../services/posts.service";
import Post from "../components/Post/Post";
import { getAllUsers } from "../services/users.service";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllPosts().then(setPosts);
    getAllUsers().then(setUsers);
  }, []);

  const sortedPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5)
    .reverse();

  return (
    <div>
      <p>Регистрирани потребители: {users.length}</p>
      <p>Брой на всички постове: {posts.length}</p>

      <h1>Начало</h1>
      {sortedPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;
