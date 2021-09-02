import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const handleOnClickProfile = () => {
    localStorage.clear();
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const email = user && user.email;

  return (
    <div>
      <Header title="Perfil" renderSearch={ false } />
      <main className="d-flex flex-column align-items-center">
        <div
          className="border border-info mb-5 mt-3 w-75 text-center"
          data-testid="profile-email"
        >
          { email }
        </div>
        <Link
          to="/receitas-feitas"
          data-testid="profile-done-btn"
          className="btn btn-info mb-3 w-75"
        >
          Receitas Feitas
        </Link>
        <Link
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
          className="btn btn-info mb-3 w-75"
        >
          Receitas Favoritas
        </Link>
        <Link
          to="/"
          onClick={ handleOnClickProfile }
          data-testid="profile-logout-btn"
          className="btn btn-info w-75"
        >
          Sair
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;
