import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Header, Footer } from '../components';

function Profile() {
  const [redirect, setRedirect] = useState(false);
  const { email } = JSON.parse(localStorage.getItem('user')) || '';

  const logout = () => {
    localStorage.clear();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <Header title="Perfil" />
      <p data-testid="profile-email">{email}</p>
      <div>
        <Link to="/receitas-feitas">
          <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas">
          <button type="button" data-testid="profile-favorite-btn">
            Receitas Favoritas
          </button>
        </Link>
        <button type="button" data-testid="profile-logout-btn" onClick={ logout }>
          Sair
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
