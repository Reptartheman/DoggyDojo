import React from 'react';
import '../App.css';

import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Header() {
  return (
    <header className="header">
      <h1>Doggy Dojo</h1>
      <h2>Helping Your Dog Reach Their Pet-tential!</h2>
      <nav
        className="button-container"
        role="group"
        aria-label="Outlined Buttons"
      >
        <Link to="/" as={Link}>
          <button type="button" className="navButtons">
            Homepage
          </button>
        </Link>
        {Auth.loggedIn() ? (
          <>
            <Link to="/me" as={Link}>
              <button type="button" className="navButtons">
                Profile
              </button>
            </Link>
            <Link to='/' as={Link} onClick={Auth.logout}>
              <button type="button" className="navButtons">
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="login" as={Link}>
              <button type="button" className="navButtons">
                Login
              </button>
            </Link>
            <Link to="/signup" as={Link}>
              <button type="button" className="navButtons">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}