import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';
import styles from './Profile.module.css';

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
      <Header>
        Perfil
      </Header>
      <h4
        data-testid="profile-email"
        className={ styles.email }
      >
        { email }
      </h4>
      <div className={ styles.profile }>
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
      </div>
      <MenuInferior />
    </div>
  );
}

export default Profile;
