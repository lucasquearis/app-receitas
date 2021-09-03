import React from 'react';
import Header from '../Components/Header';
import ButtonCard from '../Components/ButtonCard';

function Profile() {
  const getUser = localStorage.getItem('user');
  const user = JSON.parse(getUser);

  const onClickLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <Header title="Perfil" />
      <h3
        data-testid="profile-email"
      >
        { user.email }
      </h3>
      <ButtonCard
        page="/receitas-feitas"
        testId="profile-done-btn"
        buttonText="Receitas Feitas"
      />
      <ButtonCard
        page="/receitas-favoritas"
        testId="profile-favorite-btn"
        buttonText="Receitas Favoritas"
      />
      <ButtonCard
        page="/"
        testId="profile-logout-btn"
        onClick={ onClickLogout }
        buttonText="Sair"
      />
    </>
  );
}

export default Profile;
