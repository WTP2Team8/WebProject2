import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getPostById } from "../services/posts.service";
import Post from "../components/Post/Post";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then(setPost);
  }, [id]);

  const togglePostLike = (handle) =>{
    setPost({
      ...post,
      likedBy: post.likedBy.includes(handle) ? post.likedBy.filter(u => u !== handle) : [...post.likedBy, handle],
    });
  };

  return (
    <div>
      <h1>Публикация</h1>
      {post && <Post post={post} togglePostLike={togglePostLike} />}
    </div>
  )
}
