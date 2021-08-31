import React from 'react';
import { Redirect } from 'react-router';
import profileIcon from '../images/profileIcon.svg';

const handleClick = () => {
  return (<Redirect to="/" />);
};

const emailStorage = JSON.parse(localStorage.getItem('user'));
console.log(emailStorage);

const Profile = () => (
  <div>
    <label htmlFor="email-perfil">
      Email:
      <input id="email-perfil" data-testid="profile-email" />
    </label>
    <button
      name="Receitas Feitas"
      type="button"
      data-testid="profile-done-btn"
    >
      Receitas Feitas
    </button>
    <button
      name="Receitas Favoritas"
      type="button"
      data-testid="profile-favorite-btn"
      onClick={ handleClick }
    >
      Receitas Favoritas
    </button>
    <button
      name="Sair"
      type="button"
      data-testid="profile-logout-btn"
    >
      Sair
    </button>
    <button type="button" onClick={ handleClick }>
      <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
    </button>
    <p data-testid="page-title">Perfil</p>
  </div>
);

export default Profile;
