import React, { useRef } from 'react';
import './Header.css';
import logo from '../images/logo-primary2.svg';

function Header() {
  const inputRef = useRef(null);
  const menuClicked = (e) => {
    e.preventDefault();
    const target = e.target;
    inputRef.current.checked = false;

    document.querySelector(target.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
  };

  return (
    <header>
      <h1>
        <img className='logo' src={logo} alt="La Reverie Studio" />
      </h1>
      <div className="dropdown">
        <label for='dropdown-checkbox' className="dropbtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <path d="M0 0H24V24H0z"></path>
              <path
                stroke="#f5beac"
                strokeDasharray="0,0"
                strokeLinecap="round"
                strokeWidth="2"
                d="M12 6a1 1 0 100-2 1 1 0 000 2zM12 13a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z"
              ></path>
            </g>
          </svg>
        </label>
        <input type="checkbox" id="dropdown-checkbox" ref={inputRef} />
        <div className="dropdown-content">
          <a onClick={menuClicked} href="#about">About</a>
          <a onClick={menuClicked} href="#expertise">Expertise</a>
          <a onClick={menuClicked} href="#team">Team</a>
          <a onClick={menuClicked} href="#contact">Contact</a>
        </div>
      </div>
    </header>
  );
}

export default Header;