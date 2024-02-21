import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post/Post";
import { getAllPosts } from "../services/posts.service";
import SearchBar from "../components/SearchBar";

export default function SearchResults() {
  const { term } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      const filteredPosts = allPosts.filter(
        (post) =>
          (post.content &&
            post.content.toLowerCase().includes(term.toLowerCase())) ||
          (post.title && post.title.toLowerCase().includes(term.toLowerCase()))
      );
      setPosts(filteredPosts);
    };

    fetchPosts();
  }, [term]);

  return (
    <div>
      <h1>Намерени резултати за &quot;{term}&quot;</h1>
      <div>
        <SearchBar />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
