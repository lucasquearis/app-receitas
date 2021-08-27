import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Profile() {
  const email = localStorage.getItem('email');
  return (
    <div>
      <p>Profile</p>
      <span data-testid="profile-email">{email}</span>
      <Link to="/receitas-favoritas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-logout-btn">Sair</button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
