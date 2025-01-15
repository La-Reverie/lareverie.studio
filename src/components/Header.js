// Header.jsx
import React, { useState } from 'react';
import { bubble as Menu } from 'react-burger-menu';
import './Header.css';
import logo from '../images/logo-primary2.svg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setIsMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (e) => {
    e.preventDefault();
    const target = e.target;
    const element = document.querySelector(target.getAttribute('href'));
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      closeMenu();
    }
  };

  return (
    <header>
      <h1>
        <img className="logo" src={logo} alt="La Reverie Studio" />
      </h1>
      
        <div 
        className={`menu-overlay ${isMenuOpen ? 'menu-overlay--visible' : ''}`} 
        onClick={closeMenu} 
      />
      
      <Menu 
        right
        isOpen={isMenuOpen}
        width={'250px'}
        onStateChange={handleStateChange}
        className="burger-menu"
      >
        <a onClick={scrollToSection} className="menu-item" href="#home">
          Home
        </a>
        <a onClick={scrollToSection} className="menu-item" href="#featured-work">
          Featured Work
        </a>
        <a onClick={scrollToSection} className="menu-item" href="#the-studio">
          The Studio
        </a>
        <a onClick={scrollToSection} className="menu-item" href="#team">
          The Team
        </a>
        <a onClick={scrollToSection} className="menu-item" href="#news">
          What's New
        </a>
        <a onClick={scrollToSection} className="menu-item" href="#contact">
          Let's talk
        </a>
      </Menu>
    </header>
  );
}

export default Header;