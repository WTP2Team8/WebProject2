import { useContext, useEffect, useState } from "react";
import { getAllPosts } from "../services/posts.service";
import Post from "../components/Post/Post";
import { AppContext } from "../context/AppContext";
const Sorted = () => {
  const { userData } = useContext(AppContext);
  const [sortOrder, setSortOrder] = useState("desc");
  const [posts, setPosts] = useState([]);
  console.log(userData);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  const handleSort = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
  };

  const sortedData = [...posts].sort((a, b) => {
    const currentDate = new Date();
    const aDate = new Date(a.createdOn);
    const bDate = new Date(b.createdOn);

    if (sortOrder === "desc") {
      return currentDate - aDate - (currentDate - bDate);
    } else {
      return aDate - currentDate - (bDate - currentDate);
    }
  });

  return (
    
    <div className="flex flex-col items-center"> {/* Added 'items-center' class */}
    <div>
              </div>
      {userData?.handle ? (
        <select
          value={sortOrder}
          onChange={handleSort}
          className="mb-7 py-2 bg-orange-700 text-yellow-500 font-bold px-11 rounded border border-black-500"
        >
          <option value="desc">Нови към Стари</option>
          <option value="asc">Стари към Нови</option>
        </select>
      ) : null}
      <div>
        {sortedData.map((item) => (
          <div key={item?.id}>
            <Post post={item} />
           
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Sorted;
