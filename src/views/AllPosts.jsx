import { useState } from 'react';
import SinglePostView from './SinglePostView';

const Posts = () => {
    const posts = [
        { id: 1, title: 'Тема 1', content: 'Българска традиционна кухня' },
        { id: 2, title: 'Тема 2', content: 'Вегетарианска кухня' },
        { id: 3, title: 'Тема 3', content: 'Чуждестранна кухня' },
        { id: 4, title: 'Тема 4', content: 'Десерти' },
        { id: 5, title: 'Тема 5', content: 'Търся рецепта' },
    ];

    const [selectedPost, setSelectedPost] = useState(null);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    return (
        <div>
            <h1>Всички теми</h1>
            {selectedPost ? (
                <SinglePostView post={selectedPost} />
            ) : (
                posts.map((post) => (
                    <div
                        key={post.id}
                        onClick={() => handlePostClick(post)}
                        style={{
                            border: '1px solid black',
                            padding: '10px',
                            margin: '10px',
                            cursor: 'pointer',
                            backgroundColor: 'darkblue',
                            color: 'white',
                        }}
                    >
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Posts;
