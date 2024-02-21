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
    <div className="container mx-auto px-4">
      <p className="text-1xl font-bold mb-4">
        Регистрирани потребители: {users.length}
      </p>
      <p className="text-1xl font-bold mb-4">
        Брой на всички постове: {posts.length}</p>
      <h1 className="text-2xl font-bold mb-4 flex justify-center items-center">
        Начало
      </h1>
      <div className="grid grid-cols-1 gap-4">
        {sortedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
