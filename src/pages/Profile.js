import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { push } = useHistory();

  return (
    <main>
      <Header name="Perfil" search={ false } />
      <h1
        data-testid="profile-email"
      >
        { user.email }
      </h1>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          localStorage.clear();
          push('/');
        } }
      >
        Sair
      </button>
    </main>
  );
}

export default Profile;
