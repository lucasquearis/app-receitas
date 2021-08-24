import React from 'react';
import { useHistory } from 'react-router';
import MenuInferior from '../components/MenuInferior';

function Profile() {
  if (!localStorage.user) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
  }
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleClick = () => {
    history.push('./');
    localStorage.clear();
  };

  return (
    <div>
      <h2>Perfil</h2>
      <h4 data-testid="profile-email">{ email }</h4>
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
        onClick={ () => handleClick() }
      >
        Sair
      </button>
      <MenuInferior />
    </div>
  );
}

export default Profile;
