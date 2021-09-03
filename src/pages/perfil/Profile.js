import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import MenuFooter from '../../components/MenuFooter';

export default function Profile() {
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUserEmail(user.email);
  }, []);

  return (
    <div>
      <Header title="Perfil" showSearchBottom={ false } />
      <p data-testid="profile-email">{userEmail}</p>
      <Link to="receitas-feitas">
        <button type="button" data-testid="profile-done-btn">
          Receitas Feitas
        </button>
      </Link>
      <Link to="receitas-favoritas">
        <button type="button" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <MenuFooter />
    </div>
  );
}
