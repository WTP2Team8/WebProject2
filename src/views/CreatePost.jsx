import { useContext, useState } from "react";
import Button from "../components/Button";
import { addPost } from "../services/posts.service";
import { AppContext } from "../context/AppContext";
import "./CreatePost.css";

export default function CreatePost() {
  const { userData } = useContext(AppContext);
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");

  const updatePost = (value, key) => {
    setPost({
      ...post,
      [key]: value,
    });
    setError("");
  };

  const createPost = async () => {
    if (userData.isBlocked) {
      return setError("Blocked users cannot create posts!");
    }
    if (post.title.length < 16 || post.title.length > 64) {
      return setError(
        "Title must be bigger than 16 characters and less than 64 characters long"
      );
    }
    if (post.content.length < 32 || post.content.length > 8192) {
      return setError(
        "Content must be bigger than 32 characters and less than 8192 characters long"
      );
    }

    await addPost(userData.handle, post.title, post.content);

    setPost({
      title: "",
      content: "",
    });
  };

  return (
    <section className="createPostField">
      <h1>Нова Публикация във Форума</h1>
      <label htmlFor="input-title">Заглавие</label>
      <span className="require">* </span>

      <input
        className="w-full  border border-red-320 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-red-500"
        value={post.title}
        onChange={(e) => updatePost(e.target.value, "title")}
        type="text"
        name="input-title"
        id="input-title"
      />

      <br />
      <label htmlFor="select-option">Категория на публикацията</label>
      <span className="require">*</span>
      <br />
      <select name="select-option" id="select-option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <br />
      <label htmlFor="input-content">Съдържание</label>
      <span className="require">*</span>
      <br />
      <textarea
        className="w-full  border border-red-320 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-red-500"
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
    </section>
  );
}
