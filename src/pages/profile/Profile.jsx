import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Profile() {
  const profileEmail = JSON.parse(localStorage.getItem('user')).email;
  function clearLocalStorage() {
    localStorage.clear();
  }
  return (
    <>
      <Header title="Perfil" />
      <h1 data-testid="profile-email">{ profileEmail }</h1>
      <Link to="/receitas-feitas">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ clearLocalStorage }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </>
  );
}
