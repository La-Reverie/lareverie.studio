import React, { useState } from "react";
import { bubble as Menu } from "react-burger-menu";
import logo from "../images/logo-primary2.svg";
import { IoClose } from "react-icons/io5";
import { TbDotsVertical } from "react-icons/tb";


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
    const element = document.querySelector(target.getAttribute("href"));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
      closeMenu();
    }
  };

  return (
    <header className="fixed top-0 z-50 flex w-full items-center bg-black text-white">
      <h1 className="m-0 flex-grow text-center font-dancing-script text-2xl py-2">
        <img
          className="h-10 transition-all duration-300 sm:h-12 max-w-96 mx-auto"
          src={logo}
          alt="La Reverie Studio"
        />
      </h1>

      <div
        className={`fixed top-0 left-0 z-40 h-full w-full bg-black/50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      <Menu
        right
        morphShapeClassName="hello"
        isOpen={isMenuOpen}
        onStateChange={handleStateChange}
        className="burger-menu top-0 p-5 pt-10"
        
        customCrossIcon={
          <div className="custom-cross">
            <IoClose
              size={30}
              className="text-gray-200"
            />
          </div>
        }
      >
        <div className="perspective-1000">
          <a
            onClick={scrollToSection}
            className="menu-item block text-xl md:text-4xl font-semibold text-gray-200 py-3 md:py-5 opacity-60 hover:opacity-100 transition-all duration-150"
            href="#home"
          >
            Home
          </a>
          {/* <a
            onClick={scrollToSection}
            className="menu-item block  text-xl md:text-4xl font-semibold text-gray-200 py-3 md:py-5 opacity-60 hover:opacity-100 transition-all duration-150"
            href="#featured-work"
          >
            Featured Work
          </a> */}

          <a
            onClick={scrollToSection}
            className="menu-item block text-xl md:text-4xl font-semibold text-gray-200 py-3 md:py-5 opacity-60 hover:opacity-100 transition-all duration-150"
            href="#home"
          >
            Our Services
          </a>
          <a
            onClick={scrollToSection}
            className="menu-item block text-xl md:text-4xl font-semibold text-gray-200 py-3 md:py-5 opacity-60 hover:opacity-100 transition-all duration-150"
            href="#the-studio"
          >
            The Studio
          </a>
          <a
            onClick={scrollToSection}
            className="menu-item block text-xl md:text-4xl font-semibold text-gray-200 py-3 md:py-5 opacity-60 hover:opacity-100 transition-all duration-150"
            href="#team"
          >
            The Team
          </a>
          
          <a
            onClick={scrollToSection}
            className="menu-item block text-xl md:text-4xl font-semibold text-gray-200 py-3 md:py-5 opacity-60 hover:opacity-100 transition-all duration-150"
            href="#contact"
          >
            Let's Talk
          </a>
        </div>
      </Menu>

      <button
        className="bm-menu-mobile"
        onClick={() => setIsMenuOpen(true)}
      >
        <div className="mt-0 md:-mt-2 hover:bg-white hover:text-black p-2 rounded-full transition-all duration-200">
          <TbDotsVertical size={30} />
        </div>
      </button>
    </header>
  );
}

export default Header;