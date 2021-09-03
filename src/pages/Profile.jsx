import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Profile.css';

function Profile() {
  const emailFromUser = localStorage.getItem('user');
  const renderUser = JSON.parse(emailFromUser);
  const handleLocalStorage = () => {
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('user');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };
  return (
    <>
      <Header title="Perfil" />
      <div className="profile-container">
        <h3
          className="profile-email"
          data-testid="profile-email"
        >
          { renderUser.email }

        </h3>
        <Link to="receitas-feitas">
          <Button
            data-testid="profile-done-btn"
            className="group-button-profile"
          >
            Receitas Feitas

          </Button>
        </Link>
        <Link to="receitas-favoritas">
          <Button
            data-testid="profile-favorite-btn"
            className="group-button-profile"
          >
            Receitas Favoritas

          </Button>
        </Link>
        <Link to="/">
          <Button
            className="group-button-profile"
            data-testid="profile-logout-btn"
            onClick={ handleLocalStorage }
          >
            Sair
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
