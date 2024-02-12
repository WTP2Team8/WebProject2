import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default function ProfileMenu() {
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!isProfileMenuOpen);
    };

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
              <LogoutButton />
            </div>
          </div>
        )}
      </li>
    )

}