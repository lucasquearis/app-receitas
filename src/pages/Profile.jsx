import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

let email = '';
if (JSON.parse(localStorage.getItem('user')) !== null) {
  email = JSON.parse(localStorage.getItem('user')).email;
}

export default function Profile() {
  const [routes, setRoutes] = useState({
    redirectDone: false,
    redirectFavorites: false,
    redirectLogout: false,
  });

  const { redirectDone, redirectFavorites, redirectLogout } = routes;

  if (redirectDone) return <Redirect to="/receitas-feitas" />;
  if (redirectFavorites) return <Redirect to="/receitas-favoritas" />;
  if (redirectLogout) return <Redirect to="/" />;

  return (
    <>
      <Header title="Perfil" search={ false } />
      <main className="main-profile">
        <h2
          data-testid="profile-email"
          className="profile-email"
        >
          { email }

        </h2>
        <div>

          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => setRoutes({ ...routes, redirectDone: true }) }
            className="profile-btn"
          >
            <span className="label-btn">Receitas Feitas</span>
          </button>
          <button
            variant="primary"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => setRoutes({ ...routes, redirectFavorites: true }) }
            className="profile-btn"
          >
            <span className="label-btn">Receitas Favoritas</span>
          </button>
          <button
            variant="primary"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              setRoutes({ ...routes, redirectLogout: true });
            } }
            className="profile-btn"
          >
            <span className="label-btn">Sair</span>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
