import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryMenu from './CategoryMenu';
import './NavBar.css';
import ProfileMenu from './ProfileMenu';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Начало</Link>
        </li>
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
        <SearchBar />
        <ProfileMenu />
      </ul>
    </nav>
  );
};

export default Navbar;