import React, {} from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { getLocalStorage } from '../../utils';
import './style.css';

const UserProfile = () => {
  const clearEmail = () => localStorage.clear();
  const { email } = getLocalStorage('user');
  const history = useHistory();

  return (
    <div>
      <header className="header-mail" data-testid="profile-email">
        <p className="email-field">{ email }</p>
      </header>
      <section className="profile">

        <Button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </Button>

        <Button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </Button>

        <Button
          className="profile-btn"
          type="button"
          onClick={ () => { clearEmail(); history.push('/'); } }
          data-testid="profile-logout-btn"
        >
          Sair
        </Button>
      </section>
    </div>
  );
};

export default UserProfile;
