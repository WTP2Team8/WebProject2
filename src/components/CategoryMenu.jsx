import { useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryMenu() {
  const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const toggleCategoryMenu = () => {
    setCategoryMenuOpen(!isCategoryMenuOpen);
  };

  return (
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
            <Link to="/meat-category" className="category-link">
              Месни ястия
            </Link>
            <Link to="/vegeterian-category" className="category-link">
              Вегетариански ястия
            </Link>
            <Link to="/salads-category" className="category-link">
              Салати
            </Link>
            <Link to="/soups-category" className="category-link">
              Супи
            </Link>
            <Link to="/deserts-category" className="category-link">
              Десерти
            </Link>
          </div>
        </div>
      )}
    </li>
  );
}
