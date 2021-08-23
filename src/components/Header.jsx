import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/profile">
        <button
          type="button"
          className="profile-top-btn"
          data-testid="profile-top-btn"
        >
          <img src="../images/profileIcon.svg" alt="profile icon" />
        </button>
      </Link>
      <h1 data-testid="page-title">
        Recipes App
      </h1>
      <button
        type="button"
        className="search-btn"
        data-testid="search-top-btn"
      >
        <img src="../images/searchIcon.svg" alt="search icon" />
      </button>
    </header>
  );
}
