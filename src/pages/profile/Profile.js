import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';

const Profile = () => {
  const [redirect, setRedirect] = useState({
    bool: false,
  });

  const emailObject = JSON.parse(localStorage.getItem('user')) === null ? ''
    : JSON.parse(localStorage.getItem('user'));
  const email = emailObject === '' ? '' : emailObject.email;

  if (redirect.bool) {
    return <Redirect to={ `${redirect.path}` } />;
  }
  return (
    <div>
      <HeaderWithoutSearch>Perfil</HeaderWithoutSearch>
      <p data-testid="profile-email">{ email }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => {
          setRedirect({
            bool: true,
            path: '/receitas-feitas',
          });
        } }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => {
          setRedirect({
            bool: true,
            path: '/receitas-favoritas',
          });
        } }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          setRedirect({
            bool: true,
            path: '/',
          });
        } }
      >
        Sair
      </button>
    </div>
  );
};

export default Profile;
