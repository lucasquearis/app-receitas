import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import FooterBar from '../../components/FooterBar';

import { Button, Email, ProfileWrapper } from './style';

function Perfil() {
  const user = JSON.parse(localStorage.getItem('user'));

  function getEmail() {
    return (
      <Email type="text" data-testid="profile-email">
        {user.email}
      </Email>
    );
  }
  return (
    <div>
      <Header
        showSearchBtn={ false }
      />
      <ProfileWrapper>
        {user && getEmail()}
        <Button
          type="button"
          data-testid="profile-done-btn"

        >
          <Link to="/receitas-feitas">
            Receitas Feitas
          </Link>
        </Button>
        <Button
          type="button"
          data-testid="profile-favorite-btn"
        >
          <Link to="/receitas-favoritas">
            Receitas Favoritas
          </Link>
        </Button>
        <Button
          bgColor="#FF4747"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
          } }
          shadowColor="#CF3C3C"
          type="button"
          width="60vw"
        >
          <Link to="/">
            Sair
          </Link>
        </Button>
      </ProfileWrapper>
      <FooterBar />
    </div>
  );
}

export default Perfil;
