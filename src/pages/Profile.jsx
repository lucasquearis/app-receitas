import React from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  const reduxEmail = useSelector((state) => state.user.email);
  const storageEmail = JSON.parse(localStorage.getItem('user')).email;

  const exitApp = () => {
    localStorage.clear();
  };

  return (
    <section>
      <Header showExploreIcon pageTitle="Perfil" />
      <div>
        <h3 data-testid="profile-email">
          {!reduxEmail ? storageEmail : reduxEmail}
        </h3>
      </div>
      <div>
        <Link to="/receitas-feitas">
          <Button data-testid="profile-done-btn" type="button">
            Receitas Feitas
          </Button>
        </Link>
        <Link to="/receitas-favoritas">
          <Button data-testid="profile-favorite-btn" type="button">
            Receitas Favoritas
          </Button>
        </Link>
        <Link to="/">
          <Button
            onClick={ exitApp }
            data-testid="profile-logout-btn"
            type="button"
          >
            Sair
          </Button>
        </Link>
      </div>
    </section>
  );
}
