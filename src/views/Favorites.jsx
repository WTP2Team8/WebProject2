import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getAllPosts } from "../services/posts.service";
import Post from "../components/Post/Post";

const Favorites = () => {
  const { userData } = useContext(AppContext);
  const [favorites, setFavorites] = useState(null);
  console.log(userData?.likedPosts);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  useEffect(() => {
    const likedPostKeys = Object.keys(userData?.likedPosts || {});
    const filteredPosts = posts.filter((post) =>
      likedPostKeys.includes(post.id)
    );
    setFavorites(filteredPosts);
  }, [userData?.likedPosts, posts]);

  return (
    <div>
      {favorites &&
        favorites.map((post) => (
          <div key={post.id}>
            <Post key={post.id} post={post} />
          </div>
        ))}
    </div>
  );
};

export default Favorites;
