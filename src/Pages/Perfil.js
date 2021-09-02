import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Perfil() {
  const user = localStorage.getItem('user');
  const email = user.split('"')[3];
  const history = useHistory();
  console.log(document.history);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <>
      <section>
        <Header title="Perfil" searchIcon={ false } />
      </section>
      <h2 data-testid="profile-email">{ email }</h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        id="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <br />
      <button
        type="button"
        data-testid="profile-favorite-btn"
        id="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <br />
      <button
        type="button"
        data-testid="profile-logout-btn"
        id="profile-logout-btn"
        onClick={ () => logout() }
      >
        Sair
      </button>
      <Footer />
    </>
  );
}
