import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const localEmail = JSON.parse(localStorage.getItem('user'));
  const profileEmail = localEmail
    ? localEmail.email : 'Nenhum e-mail encontrado';

  const clearAndLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header brand="Perfil" className="img-search" />
      <div
        data-testid="profile-email"
      >
        { profileEmail }
      </div>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => clearAndLogout() }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
