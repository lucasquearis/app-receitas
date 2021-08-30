import React from 'react';
import { Link } from 'react-router-dom';

function Perfil() {
  const user = JSON.parse(localStorage.getItem('user'));

  function getEmail() {
    return (
      <p type="text" data-testid="profile-email">
        {user.email}
      </p>
    );
  }
  return (
    <div>
      {user && getEmail()}
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
          onClick={ () => {
            localStorage.clear();
          } }
        >
          Sair
        </button>
      </Link>
    </div>
  );
}

export default Perfil;
