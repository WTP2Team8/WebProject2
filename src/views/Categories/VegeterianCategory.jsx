import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import Post from "../../components/Post/Post";

export default function VegeterianCategory() {
  const [posts, setPosts] = useState([]);
  const vegeterianPosts = posts.filter(
    (post) => post.category === "vegeterian-category"
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
        Вегетариански ястия
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {vegeterianPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
