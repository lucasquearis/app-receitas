import React from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import profileIcon from '../images/profileIcon.svg';
import './search.css';

const FoodDetails = () => (
  <div className="container-search">
    <div className="header">
      <Link to="/perfil">
        <button type="button">
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>
      </Link>
      <p data-testid="page-title">Explorar</p>
    </div>
    <div className="buttons">
      <Link to="/explorar/comidas">
        <button type="button" data-testid="explore-food">Explorar Comidas</button>
      </Link>
      <Link to="/explorar/bebidas">
        <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
      </Link>
    </div>
    <FooterMenu />
  </div>
);

export default FoodDetails;
