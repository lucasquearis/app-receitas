import React from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import profileIcon from '../images/profileIcon.svg';

const Profile = () => {
  const emailStorage = JSON.parse(localStorage.getItem('user'));

  console.log(emailStorage);

  return (
    <div>
      <label htmlFor="email-perfil">
        Email:
        <p id="email-perfil" data-testid="profile-email">{ emailStorage.email }</p>
      </label>
      <button
        name="Receitas Feitas"
        type="button"
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </button>
      <Link to="/receitas-favoritas">
        <button
          name="Receitas Favoritas"
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <button
        name="Sair"
        type="button"
        data-testid="profile-logout-btn"
      >
        Sair
      </button>
      <button type="button">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </button>
      <p data-testid="page-title">Perfil</p>
      <FooterMenu />
    </div>
  );
};

export default Profile;
