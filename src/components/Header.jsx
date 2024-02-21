import { NavLink } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { logoutUser } from "../services/auth.service";
import "./Header.css";

export default function Header() {
  const { user, userData, setContext } = useContext(AppContext);

  const logout = async () => {
    await logoutUser();
    setContext({ user: null, userData: null });
  };

  return (
    <header className="header bg-orange-800 text-white py-4 px-6">
      {/* <img
        className="ladle"
        src="/images/cherpache.png"
        alt="Cherpache Logo"
      /> */}
      {user && (
        <NavLink
          to="/posts"
          className="mr-4 text-yellow-500"
        >
          Всички публикации
        </NavLink>
      )}
      {user && (
        <NavLink
          to="/posts-create"
          className="mr-4 text-yellow-500"
        >
          Създай публикация
        </NavLink>
      )}
      {user ? (
        <>
          <span className="greeting mr-4 text-yellow-500">{`Здравей, ${userData?.handle}`}</span>
          <Button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white"
          >
            Изход
          </Button>
        </>
      ) : (
        <>
          <NavLink
            to="/register"
            className="mr-4 text-yellow-500"
          >
            Регистрация
          </NavLink>
          <NavLink
            to="/login"
            className="mr-4 text-yellow-500"
          >
            Вход
          </NavLink>
        </>
      )}
    </header>
  );
}
