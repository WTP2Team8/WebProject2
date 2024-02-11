import { NavLink } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { logoutUser } from "../services/auth.service";

export default function Header() {
  const { user, userData, setContext } = useContext(AppContext);

  const logout = async () => {
    await logoutUser();
    setContext({ user: null, userData: null });
  };

  return (
    <header>
      <NavLink to="/">Начало</NavLink>
      {user && <NavLink to="/posts">Всички постове</NavLink>}
      {user && <NavLink to="/posts-create">Създай пост</NavLink>}
      {user ? (
        <>
          {`Здравей, ${userData?.handle}`}
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
