import { useState } from 'react';
import { useEffect } from 'react';

import {ref, push, get, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { getAuth } from 'firebase/auth';


const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);

    
    

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const fetchPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setPosts(postsArray);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
            try {
                await addDoc(collection(db, "posts"), {
                    title,
                    content,
                    user: user.uid,
                    createdAt: Timestamp.now(),
                    likes: 0,
                    dislikes: 0
                });
                setTitle('');
                setContent('');
                fetchPosts();
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            console.log("No user logged in");
        
        }
    };
    

    const handleLike = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].likes += 1;
        setPosts(updatedPosts);
    };

    const handleDislike = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].dislikes += 1;
        setPosts(updatedPosts);
    };

    return (
        <div>
            <h2>Създай публикация</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Заглавие</label>
                <input type="text" id="title" value={title} onChange={handleTitleChange} />

                <label htmlFor="content">Съдържание:</label>
                <textarea id="content" value={content} onChange={handleContentChange} />

                <button type="submit">Създаване на тема</button>
            </form>
            <div>
                <h3>Теми</h3>
                {posts.length > 0 ? (
                    <ul>
                        {posts.map((post, index) => (
                            <li key={index}>
                                <h4>{post.title}</h4>
                                <p>{post.content}</p>
                                <p>Публикувано от: {post.user}</p>
                                <p>Създадена на:{post.createdAt}</p>
                                <button onClick={() => handleLike(index)}> 
                
                                </button>
                                <button onClick={() => handleDislike(index)}> 
                                
                                </button>
                                <p>Likes: {post.likes}</p> 
                                <p>Dislikes: {post.dislikes}</p> 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Няма публикации</p>
                )}
            </div>
        </div>
    );
};

export default CreatePost;