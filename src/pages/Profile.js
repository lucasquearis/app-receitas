import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './css/Profile.css';

function Profile() {
  const getEmail = () => {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      return email;
    }
  };

  const history = useHistory();

  const doneRecipes = () => {
    history.push('/receitas-feitas');
  };

  const favoriteRecipes = () => {
    history.push('/receitas-favoritas');
  };

  const loginPage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Perfil" />
      <h1 data-testid="profile-email">{ getEmail() }</h1>
      <button
        data-testid="profile-done-btn"
        type="submit"
        onClick={ doneRecipes }
      >
        Receitas Feitas
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="submit"
        onClick={ favoriteRecipes }
      >
        Receitas Favoritas
      </button>
      <button
        data-testid="profile-logout-btn"
        type="submit"
        onClick={ loginPage }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}
export default Profile;
