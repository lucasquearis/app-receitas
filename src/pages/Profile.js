import React from 'react';
import './pageCSS/Profile.css';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || { email: '' };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <HeaderNoSearch title="Perfil" />
      <span data-testid="profile-email">{ user.email }</span>
      <section className="profile__btn-section">
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
          >
            Sair
          </button>
        </Link>
      </section>
      <BottomMenu />
    </>
  );
}
