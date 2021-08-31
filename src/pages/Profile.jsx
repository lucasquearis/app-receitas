import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
      <h3 data-testid="profile-email">{ renderUser.email }</h3>
      <Link to="receitas-feitas">
        <Button data-testid="profile-done-btn">Receitas Feitas</Button>
      </Link>
      <Link to="receitas-favoritas">
        <Button data-testid="profile-favorite-btn">Receitas Favoritas</Button>
      </Link>
      <Link to="/">
        <Button
          data-testid="profile-logout-btn"
          onClick={ handleLocalStorage }
        >
          Sair
        </Button>
      </Link>
      <Footer />
    </>
  );
}

export default Profile;
