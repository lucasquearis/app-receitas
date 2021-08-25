import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const handleOnClickProfile = () => {
    localStorage.clear();
  };

  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header title="Perfil" />
      <main>
        <div data-testid="profile-email">{ email }</div>
        <Link to="/receitas-feitas" data-testid="profile-done-btn">
          Receitas Feitas
        </Link>
        <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </Link>
        <Link
          to="/"
          onClick={ handleOnClickProfile }
          data-testid="profile-logout-btn"
        >
          Sair
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;
