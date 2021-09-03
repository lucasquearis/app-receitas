import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { getSavedAssistent } from '../../utils';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = getSavedAssistent('user');
    if (user) {
      setUserEmail(user.email);
    }
  }, [userEmail]);

  const handleLogoutButton = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header>Perfil</Header>
      <main className="explore-container">
        <h2 data-testid="profile-email">{ userEmail }</h2>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
          className="explore-button"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
          className="explore-button"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => handleLogoutButton() }
          className="explore-button"
        >
          Sair
        </button>
      </main>
      <Footer />
    </div>
  );
}
