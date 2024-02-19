import { useEffect, useState } from "react";
import { getAllPosts, likePost } from "../services/posts.service";
import Post from "../components/Post/Post";
import { useSearchParams } from "react-router-dom";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';

  const setSearch = (value) => {
    setSearchParams({search: value});
  };

  useEffect(() => {
    getAllPosts(search).then(setPosts);
  }, [search]);

  // const togglePostLike = (handle, id) => {
  //   likePost(handle, id).then(() => {

  //   })
  //   // setPosts(posts.map(p => {
  //   //   if (p.id === id) {
  //   //     p.likedBy = p.likedBy.includes(handle) ? p.likedBy.filter(u => u !== handle) : [...p.likedBy, handle];
  //   //   }
  //   //   return p;
    
  //   // }));
  // };

  return (
    <div >
      <h1>Всички публикации</h1>
        <label className="search-bar" htmlFor="search">Търсене </label>
        <input value={search} onChange={e => setSearch(e.target.value)} type="text" name="search" id="search" /><br/>
        {posts.map((post) => (
          <Post key={post.id} post={post}/>
        ))}
    </div>
  );
}
