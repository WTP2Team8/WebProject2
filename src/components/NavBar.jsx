
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
    const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const toggleCategoryMenu = () => {
    setCategoryMenuOpen(!isCategoryMenuOpen);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Начало</Link>
        </li>
        <li
          id="category-menu"
          className="nav-item"
          onMouseEnter={toggleCategoryMenu}
          onMouseLeave={toggleCategoryMenu}
        >
          <span className="nav-link">Категории</span>
          {isCategoryMenuOpen && (
            <div id="dropdown-menu" className="dropdown-menu">
              {/* Add your category links here */}
              <div className="category-column">
                <Link to="/category1" className="category-link">
                  Категория 1
                </Link>
                <Link to="/category2" className="category-link">
                  Категория 2
                </Link>
                <Link to="/category3" className="category-link">
                  Категория 3
                </Link>
              </div>
            </div>
          )}
        </li>
        <li className="nav-item">
          <Link to="/posts">Публикации</Link>
        </li>
        <li className="nav-item">
          <Link to="/trending">Най-актуални</Link>
        </li>
        <li className="nav-item">
          <Link to="/contacts">Контакти</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;