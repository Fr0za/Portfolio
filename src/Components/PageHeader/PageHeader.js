import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../images/logo.png';
import './PageHeader.css';

const PageHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/projects', text: 'Projects' },
    { to: '/contacts', text: 'Contacts' },
  ];

  return (
    <nav className="bg-gradient-to-r">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <NavLink to="/" className="text-white font-bold text-2xl tracking-tight">
            <img src={logo} alt="Logo" className="logo-image" />
          </NavLink>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-white hover:underline text-lg font-medium"
                activeclassname="text-green-200"
                onClick={toggleNav}
              >
                {link.text}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/Fr0za" className="text-white hover:text-green-200">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://linkedin.com" className="text-white hover:text-green-200">
              <FaLinkedin className="text-2xl" />
            </a>
            <button
              className="text-white hover:text-green-200 md:hidden"
              onClick={toggleNav}
            >
              {isNavOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
        {isNavOpen && (
          <div className="md:hidden">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="block py-2 text-white hover:text-green-200"
                activeclassname="text-green-200"
                onClick={toggleNav}
              >
                {link.text}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default PageHeader;
