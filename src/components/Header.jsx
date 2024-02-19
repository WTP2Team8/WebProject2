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
    <header className="header">
      {/* <img
        className="ladle"
        src="/images/cherpache.png"
        alt="Cherpache Logo"
      /> */}
      {user && <NavLink to="/posts">Всички постове</NavLink>}
      {user && <NavLink to="/posts-create">Създай пост</NavLink>}
      {user ? (
        <>
          <span className="greeting">{`Здравей, ${userData?.handle}`}</span>
          <Button onClick={logout}>Изход</Button>
        </>
      ) : (
        <>
          <NavLink to="/register">Регистрация</NavLink>
          <NavLink to="/login">Вход</NavLink>
        </>
      )}
    </header>
  );
}
