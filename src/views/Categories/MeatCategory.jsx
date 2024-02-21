import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import Post from "../../components/Post/Post";

export default function MeatCategory() {
  const [posts, setPosts] = useState([]);
  const meatPosts = posts.filter((post) => post.category === "meat-category");

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
        Месни ястия
      </h1>
      <div>
        {meatPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
