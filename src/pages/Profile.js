import React from 'react';
import './pageCSS/Profile.css';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import HeaderNoSearch from '../components/HeaderNoSearch';
import NaaruNoBg from '../images/naaru_no_bg.png';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || { email: '' };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <HeaderNoSearch title="Meu Perfil" />
      <div className="profile__div">
        <img src={ NaaruNoBg } className="profile__icon" alt="Naaru Profile" />
        <spam data-testid="profile-email" className="profile__email">{ user.email }</spam>
        <section className="profile__btn-section">
          <Link to="/receitas-feitas">
            <button
              type="button"
              className="pure-button pure-button-primary"
              data-testid="profile-done-btn"
            >
              Receitas feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              type="button"
              className="pure-button pure-button-primary"
              data-testid="profile-favorite-btn"
            >
              Receitas favoritas
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              className="pure-button pure-button-logout"
              data-testid="profile-logout-btn"
              onClick={ handleLogout }
            >
              Sair
            </button>
          </Link>
        </section>
      </div>
      <BottomMenu />
    </>
  );
}
