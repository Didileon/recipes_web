import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="nav-container">
        <button
          className="burger"
          onClick={toggleMenu}
          aria-label="Открыть меню"
        >
          ☰
        </button>

        {/*  здесь кавычки вокруг шаблонной строки */}
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <NavLink
                to="/Main"
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={closeMenu}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/components/Categories"
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={closeMenu}
              >
                Категории
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/components/Recipes"
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={closeMenu}
              >
                Рецепты
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/components/SearchRecipes"
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={closeMenu}
              >
                Поиск
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/components/OpenAPI"
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={closeMenu}
              >
                OpenAPI
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
