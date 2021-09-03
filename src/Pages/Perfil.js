import React from 'react';
import { useHistory } from 'react-router-dom';
import './Perfil.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Perfil() {
  const user = localStorage.getItem('user');
  let email = 'email@mail.com';
  if (user) {
    const [, , , myArray] = user.split('"');
    email = myArray;
  }
  const history = useHistory();
  console.log(history);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <section className="main-section">
      <section className="header-section">
        <Header title="Perfil" searchIcon={ false } />
      </section>
      <section className="profile-button">
        <h2 data-testid="profile-email">{ email }</h2>
        <button
          className="btn btn-success"
          type="button"
          data-testid="profile-done-btn"
          id="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          className="btn btn-success"
          type="button"
          data-testid="profile-favorite-btn"
          id="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          className="btn btn-success"
          type="button"
          data-testid="profile-logout-btn"
          id="profile-logout-btn"
          onClick={ () => logout() }
        >
          Sair
        </button>
      </section>
      <Footer />
    </section>
  );
}
