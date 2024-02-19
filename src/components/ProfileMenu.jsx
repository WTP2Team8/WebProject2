import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../services/auth.service";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import Button from "./Button";

export default function ProfileMenu() {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, userData, setContext } = useContext(AppContext);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const logout = async () => {
    await logoutUser();
    setContext({ user: null, userData: null });
  };

  if (user) {
    return (
      <li
        id="profile-menu"
        className="nav-item"
        onMouseEnter={toggleProfileMenu}
        onMouseLeave={toggleProfileMenu}
      >
        <span className="nav-link">Профил</span>
        {isProfileMenuOpen && (
          <div id="dropdown-menu" className="dropdown-menu">
            {/* Add your profile links here */}
            <div className="profile-column">
              <Link to="/favorites" className="profile-link">
                Любими
              </Link>
              <Link to="/my-posts" className="profile-link">
                Моите публикации
              </Link>
              <Link to="/my-comments" className="profile-link">
                Моите коментари
              </Link>
              <Link to="/profile" className="profile-link">
                Профил
              </Link>
              {userData?.isAdmin && (
                <Link to="/admin" className="profile-link">
                  Админ
                </Link>
              )}

              <Button onClick={logout}> Изход </Button>
            </div>
          </div>
        )}
      </li>
    );
  } else {
    return (
      <li
        id="profile-menu"
        className="nav-item"
        onMouseEnter={toggleProfileMenu}
        onMouseLeave={toggleProfileMenu}
      >
        <span className="nav-link">Профил</span>
        {isProfileMenuOpen && (
          <div id="dropdown-menu" className="dropdown-menu">
            {/* Add your profile links here */}
            <div className="profile-column">
              <Link to="/login" className="profile-link">
                Вход
              </Link>
              <Link to="/register" className="profile-link">
                Регистрация
              </Link>
            </div>
          </div>
        )}
      </li>
    );
  }
}
