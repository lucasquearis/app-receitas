import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div>
      { redirectToDone && <Redirect to="/receitas-feitas" /> }
      { redirectToFavorite && <Redirect to="/receitas-favoritas" /> }
      { redirectToLogin && <Redirect to="/" /> }
      <Header titulo="Perfil" showProfileIcon />
      { user && <p data-testid="profile-email">{user.email}</p> }
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ changeToDoneRecipes }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ changeToFavoriteRecipes }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Perfil;
