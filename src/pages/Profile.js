import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLocalStorage } from '../components/LocalStorage';

function Profile() {
  const userEmail = getLocalStorage('user').email;
  const logoutButton = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Perfil" />
      <div>
        <p data-testid="profile-email">{ userEmail }</p>
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
            onClick={ logoutButton }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
