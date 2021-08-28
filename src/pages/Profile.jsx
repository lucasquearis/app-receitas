import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

export default function Profile() {
  const [shouldRedirect, setRedirect] = useState({
    done: false,
    favorites: false,
    login: false,
  });

  const storageMail = JSON.parse(localStorage.getItem('user'));
  const email = storageMail ? storageMail.email : null;

  function updateRedirect({ target: { name } }) {
    setRedirect({ ...shouldRedirect, [name]: true });
    if (name === 'login') localStorage.clear();
  }

  if (shouldRedirect.done) return <Redirect to="/receitas-feitas" />;
  if (shouldRedirect.favorites) return <Redirect to="/receitas-favoritas" />;
  if (shouldRedirect.login) return <Redirect to="/" />;
  return (
    <main>
      <Header title="Perfil" />
      <div className="profile-div">
        <div data-testid="profile-email">{ email }</div>
        <button
          type="button"
          className="button"
          data-testid="profile-done-btn"
          name="done"
          onClick={ updateRedirect }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          className="button"
          data-testid="profile-favorite-btn"
          name="favorites"
          onClick={ updateRedirect }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          className="button"
          data-testid="profile-logout-btn"
          name="login"
          onClick={ updateRedirect }
        >
          Sair
        </button>
      </div>
      <Footer />
    </main>
  );
}
