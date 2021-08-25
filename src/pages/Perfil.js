import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';

function Perfil() {
  const { email }= JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header title="Perfil" />
      <main>
        <div data-testid="profile-email">{ email }</div>
        <Link to="/receitas-feitas" data-testid="profile-done-btn">
          Receitas Feitas
        </Link>
        <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
          Receitas Feitas
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;
