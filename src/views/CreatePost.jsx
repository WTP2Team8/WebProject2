

import { useContext, useState } from "react";
import Button from "../components/Button";
import { addPost } from "../services/posts.service";
import { AppContext } from "../context/AppContext";

export default function CreatePost() {
  const { userData } = useContext(AppContext);
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  const updatePost = (value, key) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  const createPost = async () => {
    if (post.title.length < 7) {
      return alert('Title must be at least 7 characters long');
    }
    if (post.content.length < 15) {
      return alert('Content must be at least 15 characters long');
    }
    
   try {
      await addPost(userData.handle, post.title, post.content);
     
    } catch (error) {
      console.error("Възникна грешка при създаването на пост", error);
      
    }

    setPost({
      title: '',
      content: '',
    });
  };

  return (
    <div>
      <h1>Създай публикация</h1>
      <label htmlFor="input-title">Заглавие:</label>
      <input value={post.title} onChange={e => updatePost(e.target.value, 'title')} type="text" name="input-title" id="input-title" /><br/>
      <label htmlFor="input-content">Съдържание:</label><br/>
      <textarea value={post.content} onChange={e => updatePost(e.target.value, 'content')} name="input-content" id="input-content" cols="30" rows="10"></textarea><br/><br/>
      <Button onClick={createPost}>Създай</Button>
    </div>
  );
}