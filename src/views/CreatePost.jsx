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
    category: "",
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
      return setError("Блокирани потребители не могат да създават постове!");
    }

    if (post.title.length < 16 || post.title.length >= 64) {
      return setError(
        "Заглавието трябва да бъде с дължина между 16 и 64 символа!"
      );
    }
    if (post.content.length < 32 || post.content.length >= 8192) {
      return setError(
        "Съдържанието трябва да бъде с дължина между 32 и 8192 символа!"
      );
    }

    if (post.category === "") {
      return setError("Моля изберете категория на публикацията!");
    }

    await addPost(userData.handle, post.title, post.content, post.category);

    setError(
      <span style={{ color: "green" }}>Ураа, дано си създал нещо вкусно!</span>
    );

    setPost({
      title: "",
      content: "",
      category: "",
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    updatePost(selectedCategory, "category");
  };

  return (
    <section className="createPostField">
      <h1 className="text-2xl text-center font-bold mb-4">Нова Публикация във Форума</h1>

      {error && (
        <div id="error" className="text-red-500 mb-2">
          {error}
        </div>
      )}
      <label htmlFor="input-title" className="block mb-2">
        Заглавие
        <span className="require">*</span>
      </label>

      <input
        className="w-full border border-red-320 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-red-500 mb-4"
        value={post.title}
        onChange={(e) => updatePost(e.target.value, "title")}
        type="text"
        name="input-title"
        id="input-title"
      />

      <label htmlFor="select-option" className="block mb-2">
        Категория на публикацията
        <span className="require">*</span>
      </label>
      <select
        name="select-option"
        id="select-option"
        value={post.category}
        onChange={handleCategoryChange}
        className="w-full border border-red-320 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-red-500 mb-4"
      >
        <option value="" disabled selected>
          Изберете категория
        </option>
        <option value="meat-category">Месни ястия</option>
        <option value="vegeterian-category">Вегетариански ястия</option>
        <option value="salads-category">Салати</option>
        <option value="soups-category">Супи</option>
        <option value="deserts-category">Десерти</option>
      </select>

      <label htmlFor="input-content" className="block mb-2">
        Съдържание
        <span className="require">*</span>
      </label>
      <textarea
        className="w-full border border-red-320 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-red-500 mb-4"
        value={post.content}
        onChange={(e) => updatePost(e.target.value, "content")}
        name="input-content"
        id="input-content"
        cols="30"
        rows="10"
      ></textarea>

      <Button onClick={createPost}>Създай</Button>
    </section>
  );
}
