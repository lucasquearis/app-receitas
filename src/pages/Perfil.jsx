import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil(props) {
  const emailLocalStorage = localStorage.getItem('user');
  const email = JSON.parse(emailLocalStorage);
  const emailH2 = email.email;

  const redirect = () => {
    const path = '/';
    props.history.push(path);
  };

  const onClink = () => {
    localStorage.clear();
    redirect();
  };

  return (
    <div>
      <Header titulo="Perfil" />
      <h2 data-testid="profile-email">{ emailH2 }</h2>
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
      <button
        onClick={ () => onClink() }
        type="button"
        data-testid="profile-logout-btn"
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Perfil;
