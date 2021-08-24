import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile(props) {
  const [email, SetEmail] = useState();

  useEffect(() => {
    const local = localStorage.getItem('user');
    const getLocal = JSON.parse(local);
    SetEmail(getLocal.email);
  }, [email]);

  const FavoriteRecipes = () => {
    const { history } = props;
    history.push('/receitas-favoritas');
  };

  const RecipesMade = () => {
    const { history } = props;
    history.push('/receitas-feitas');
  };

  const BackToLogin = () => {
    const { history } = props;
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Perfil" />
      <h4 data-testid="profile-email">{ email }</h4>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => RecipesMade() }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => FavoriteRecipes() }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        onClick={ BackToLogin }
        data-testid="profile-logout-btn"
      >
        Sair
      </button>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Profile;
