import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, FooterMenu } from '../components';

export default function PerfilPage() {
  const [redirectToDoneRecipes, setRedirectToDoneRecipes] = useState(false);
  const [redirectToFavRecipes, setRedirectToFavRecipes] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleClickDoneRecipes = () => {
    setRedirectToDoneRecipes(true);
  };

  const handleClickFavRecipes = () => {
    setRedirectToFavRecipes(true);
  };

  const clearLocalStorage = () => localStorage.clear();

  const handleClickLogin = () => {
    clearLocalStorage();
    setRedirectToLogin(true);
  };

  if (redirectToDoneRecipes) return <Redirect to="/receitas-feitas" />;
  if (redirectToFavRecipes) return <Redirect to="/receitas-favoritas" />;
  if (redirectToLogin) return <Redirect to="/" />;

  const userEmail = localStorage.getItem('user')
    && JSON.parse(localStorage.getItem('user')).email;

  return (
    <div>
      <Header title="Perfil" showSearchIcon={ false } />

      <p data-testid="profile-email">{userEmail}</p>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleClickDoneRecipes }
      >
        Receitas Feitas
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleClickFavRecipes }
      >
        Receitas Favoritas
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogin }
      >
        Sair
      </button>
      <FooterMenu />
    </div>
  );
}
