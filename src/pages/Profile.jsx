import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import StarsIcon from '@material-ui/icons/Stars';
import CheckIcon from '@material-ui/icons/Check';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Header, Footer } from '../components';
import { ProfileContent, NavProfileDiv,
  ProfileBtn, ProfileEmailContent } from '../UI globalStyles';

function Profile() {
  const [redirect, setRedirect] = useState();
  const { email } = JSON.parse(localStorage.getItem('user')) || '';

  const logout = () => {
    localStorage.clear();
    setRedirect('/');
  };

  if (redirect) {
    return <Redirect to={ redirect } />;
  }

  return (
    <main>
      <Header title="Perfil" />
      <ProfileContent>
        <ProfileEmailContent>
          <p data-testid="profile-email">{email}</p>
        </ProfileEmailContent>
        <NavProfileDiv>
          <ProfileBtn
            type="button"
            onClick={ () => setRedirect('/receitas-feitas') }
            data-testid="profile-done-btn"
          >
            <CheckIcon />
            <p>Receitas Feitas</p>
          </ProfileBtn>
          <ProfileBtn
            type="button"
            onClick={ () => setRedirect('/receitas-favoritas') }
            data-testid="profile-favorite-btn"
          >
            <StarsIcon />
            <p>Receitas Favoritas</p>
          </ProfileBtn>
          <ProfileBtn type="button" data-testid="profile-logout-btn" onClick={ logout }>
            <ExitToAppIcon />
            <p>Sair</p>
          </ProfileBtn>
        </NavProfileDiv>
      </ProfileContent>
      <Footer />
    </main>
  );
}

export default Profile;
