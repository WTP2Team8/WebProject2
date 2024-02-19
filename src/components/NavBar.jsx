import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";
import "./NavBar.css";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><img
        className="ladle"
        src="/images/cherpache.png"
        alt="Cherpache Logo"
      /></li>
        <CategoryMenu />
        <li className="nav-item">
          <Link to="/posts">Публикации</Link>
        </li>
        <li className="nav-item">
          <Link to="/trending">Най-актуални</Link>
        </li>
        <li className="nav-item">
          <Link to="/contacts">Контакти</Link>
        </li>
        <SearchBar style={{ width: "200px", flex: "0 0 auto" }} />
        <ProfileMenu />
      </ul>
    </nav>
  );
};

export default Navbar;
