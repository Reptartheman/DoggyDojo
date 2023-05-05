import React from 'react';
import '../../App.css';

export default function Header({ currentPage, handlePageChange }) {
  return (
    <header className="header">
      <h1> Doggy Dojo </h1>
      <h2> Helping Your Dog Reach Their Pet-tential! </h2>
      <nav
        className="button-container"
        role="group"
        aria-label="Outlined Buttons"
      >
        <button
          type="button"
          className="navButtons"
          onClick={() => handlePageChange('Homepage')}
        >
          Home
        </button>
        <button type="button" className="navButtons">
          Login
        </button>
        <button type="button" className="navButtons">
          Signup
        </button>
        <button type="button" className="navButtons">
          Profile
        </button>
      </nav>
    </header>
  );
}
