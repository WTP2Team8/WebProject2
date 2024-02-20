import { useContext, useEffect, useState } from "react";
import { getAllPosts } from "../services/posts.service";
import Post from "../components/Post/Post";
import { AppContext } from "../context/AppContext";
const Sorted = () => {
  const { userData } = useContext(AppContext);
  const [sortOrder, setSortOrder] = useState("desc");
  const [posts, setPosts] = useState([]);

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
    <div className="p-4">
      {userData?.handle ? (
        <select
          value={sortOrder}
          onChange={handleSort}
          className="mb-4 p-2 rounded border border-gray-300"
        >
          <option value="desc">Newest to Oldest</option>
          <option value="asc">Oldest to Newest</option>
        </select>
      ) : null}
      <div className="grid grid-cols-10 gap-4 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-3">
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
