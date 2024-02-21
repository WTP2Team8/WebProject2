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
      <h1 className="text-2xl font-bold mb-4 flex justify-center items-center">
        Салати
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {saladsPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
