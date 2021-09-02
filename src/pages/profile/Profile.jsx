import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './profile.css';
import logo from '../../images/logo.svg';

export default function Profile() {
  const profileEmail = JSON.parse(localStorage.getItem('user'));
  function clearLocalStorage() {
    localStorage.clear();
  }
  return (
    <div className="perfilPage">
      <Header title="Perfil" />
      <section className="logo-email-container">
        <img src={ logo } alt="logo" />
        <h1
          data-testid="profile-email"
        >
          { profileEmail ? profileEmail.email : '' }
        </h1>
      </section>
      <section className="btn-container-profile">
        <Link to="/receitas-feitas" className="proile-btn">
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas" className="proile-btn">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/" className="proile-btn">
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ clearLocalStorage }
          >
            Sair
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}
