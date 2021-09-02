import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import CategoryFoodButtons from './CategoryFoodButtons';
import FoodSearchBar from './FoodSearchBar';

function FoodHeader({ title }) {
  const [showBar, setShowBar] = useState(false);

  const renderSearchBar = () => (showBar ? setShowBar(false) : setShowBar(true));

  if (!showBar) {
    return (
      <section>
        <header className="header-container">
          <Link to="/perfil">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile"
            />
          </Link>
          <h2 data-testid="page-title">{ title }</h2>
          <button
            className="header-button"
            type="button"
            data-test-id="search-top-btn"
            onClick={ renderSearchBar }
          >
            <img src={ searchIcon } alt="search icon" />
          </button>
        </header>
        <CategoryFoodButtons />
      </section>
    );
  }

  return (
    <section>
      <header className="header-container">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </Link>
        <h2 data-testid="page-title">{ title }</h2>
        <button
          className="header-button"
          type="button"
          data-test-id="search-top-btn"
          onClick={ renderSearchBar }
        >
          <img src={ searchIcon } alt="search icon" />
        </button>
      </header>
      <FoodSearchBar />
    </section>
  );
}

FoodHeader.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default FoodHeader;
