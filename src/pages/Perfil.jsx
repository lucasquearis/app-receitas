import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../cssPages/Perfil.css';

function Perfil(props) {
  const [email, setEmail] = useState('');
  const { history } = props;

  const local = () => {
    const info = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')) : '';
    setEmail(info.email);
  };

  useEffect(() => {
    local();
  }, []);

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header titulo="Perfil" />
      <div className="perfil">
        <p data-testid="profile-email">{ email }</p>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => logOut() }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Perfil;
