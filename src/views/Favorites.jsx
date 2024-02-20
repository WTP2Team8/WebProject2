import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Favorites = () => {
  const { user, userData } = useContext(AppContext);
  const [favorites, setFavorites] = useState(null);
  console.log(userData?.likedPosts);

  useEffect(() => {
    if (userData) {
      const favorites = userData.favorites;
      if (favorites) {
        const favs = Object.keys(favorites).map((key) => {
          return favorites[key];
        });
        setFavorites(favs);
      }
    }
  }, [userData]);

  return (
    <div>
      <h1>Любими</h1>
      {favorites &&
        favorites.map((favorite) => {
          return (
            <div key={favorite.id}>
              <h2>{favorite.id}</h2>
              <p>{favorite.likedPosts}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Favorites;
