import React from 'react';
import { Button } from 'react-bootstrap';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <HeaderWithoutSearch />
      <h3 data-testid="profile-email">{email}</h3>
      <Button
        variant="success"
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </Button>
      <Button
        variant="warning"
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </Button>
      <Button
        variant="danger"
        data-testid="profile-logout-btn"
      >
        Sair
      </Button>
    </div>
  );
}

export default Profile;
