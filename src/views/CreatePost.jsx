import { useContext, useState } from "react";
import Button from "../components/Button";
import { addPost } from "../services/posts.service";
import { AppContext } from "../context/AppContext";

export default function CreatePost() {
  const { userData } = useContext(AppContext);
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const updatePost = (value, key) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  const createPost = async () => {
    if (userData.isBlocked) {
      return alert("Blocked users cannot create posts!");
    }
    if (post.title.length > 5 && post.title.length < 25) {
      return alert(
        "Title must be bigger than 5 characters and less than 25 characters long"
      );
    }
    if (post.content.length > 15 && post.content.length < 100) {
      return alert(
        "Content must be bigger than 15 characters and less than 100 characters long"
      );
    }

    await addPost(userData.handle, post.title, post.content);

    setPost({
      title: "",
      content: "",
    });
  };

  return (
    <div>
      <h1>Създай публикация</h1>
      <label htmlFor="input-title">Заглавие:</label>
      <input
        value={post.title}
        onChange={(e) => updatePost(e.target.value, "title")}
        type="text"
        name="input-title"
        id="input-title"
      />
      <br />
      <label htmlFor="input-content">Съдържание:</label>
      <br />
      <textarea
        value={post.content}
        onChange={(e) => updatePost(e.target.value, "content")}
        name="input-content"
        id="input-content"
        cols="30"
        rows="10"
      ></textarea>
      <br />
      <br />
      <Button onClick={createPost}>Създай</Button>
    </div>
  );
}
