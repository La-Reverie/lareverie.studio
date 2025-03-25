import React from 'react';
import { slide as Menu } from 'react-burger-menu';

const Navbar = ({ scrolled }) => {
  const styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      right: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#ffffff'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#ffffff'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      top: 0
    },
    bmMenu: {
      background: '#234159',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmItemList: {
      color: '#ffffff',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block',
      margin: '1rem 0',
      color: '#ffffff',
      textDecoration: 'none'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-brown-900 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold"><span className="bg-red-500 px-1.5 py-1">House Design</span></div>
          
          <div className="hidden md:flex space-x-4">
            <a href="#portfolio" className="text-white px-1 hover:bg-red-500">Portfolio</a>
            <a href="#about" className="text-white px-1 hover:bg-red-500">About</a>
            <a href="#journey" className="text-white px-1 hover:bg-red-500">Journey</a>
            <a href="#contact" className="text-white px-1 hover:bg-red-500">Contact</a>
          </div>

          <div className="md:hidden">
            <Menu right styles={styles}>
              <a href="#portfolio" className="menu-item block w-full">Portfolio</a>
              <a href="#about" className="menu-item block w-full">About</a>
              <a href="#journey" className="menu-item block w-full">Journey</a>
              <a href="#contact" className="menu-item block w-full">Contact</a>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;