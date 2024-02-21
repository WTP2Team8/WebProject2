import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import Post from "../../components/Post/Post";

export default function SaladsCategory() {
  const [posts, setPosts] = useState([]);
  const saladsPosts = posts.filter(
    (post) => post.category === "salads-category"
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1
        style={{
          fontFamily: "Open Sans, Open Sans-fallback, sans-serif",
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          textAlign: "center",
          color: "black",
          borde: "20px solid #FFBE54",
        }}
      >
      </h1>

      <div>
        {saladsPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
