import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './perfil.css';

function Perfil() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [redirectToDone, setRedirectToDone] = useState(false);
  const [redirectToFavorite, setRedirectToFavorite] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const changeToDoneRecipes = () => {
    setRedirectToDone(true);
  };

  const changeToFavoriteRecipes = () => {
    setRedirectToFavorite(true);
  };

  const logout = () => {
    localStorage.clear();
    setRedirectToLogin(true);
  };

  return (
    <>
      { redirectToDone && <Redirect to="/receitas-feitas" /> }
      { redirectToFavorite && <Redirect to="/receitas-favoritas" /> }
      { redirectToLogin && <Redirect to="/" /> }
      <Header titulo="Perfil" showProfileIcon />
      <div className="perfil-btn-container">
        { user && <h5 data-testid="profile-email">{user.email}</h5> }
        <Button
          size="lg"
          type="button"
          data-testid="profile-done-btn"
          onClick={ changeToDoneRecipes }
        >
          Receitas Feitas
        </Button>
        <Button
          size="lg"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ changeToFavoriteRecipes }
        >
          Receitas Favoritas
        </Button>
        <Button
          size="lg"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Sair
        </Button>
      </div>
      <Footer />
    </>
  );
}

export default Perfil;
