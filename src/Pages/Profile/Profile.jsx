import React from 'react';
import { Link } from 'react-router-dom';
import Btn from '../../Components/Btn';
import ProfileIcon from '../../images/profileIcon.svg';
import BottomMenu from '../../Components/Footer/BottomMenu';

function Profile() {
  const receitasFeitasProps = {
    testid: 'profile-done-btn',
    name: 'Receitas Feitas',
  };

  const receitasFavoritasProps = {
    testid: 'profile-favorite-btn',
    name: 'Receitas favoritas',
  };

  const logoutProps = {
    testid: 'profile-logout-btn',
    name: 'Sair',
  };

  return (
    <div>
      <header>
        <img src={ ProfileIcon } alt="profile icon" />
        <h1>Perfil</h1>
      </header>
      <section>
        <Link to="/receitas-feitas">
          <Btn { ...receitasFeitasProps } />
        </Link>
        <Link to="/receitas-favoritas">
          <Btn { ...receitasFavoritasProps } />
        </Link>
        <Link to="/">
          <Btn { ...logoutProps } />
        </Link>
      </section>
      <BottomMenu />
    </div>
  );
}

export default Profile;
