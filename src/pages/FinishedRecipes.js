import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

const FinishedRecipes = () => (
  <div>
    <Link to="/perfil">
      <button type="button">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </button>
    </Link>
    <p data-testid="page-title">Receitas Feitas</p>
  </div>
);

export default FinishedRecipes;
