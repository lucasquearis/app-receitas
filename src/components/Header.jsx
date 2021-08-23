import React from 'react';

export default function Header() {
  return (
    <header>
      <button
        type="button"
        className="profile"
        data-testid="profile-btn"
      >
        <img src="../images/profileIcon.svg" alt="profile icon" />
      </button>
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
