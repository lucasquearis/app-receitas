import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router';
import Header from '../components/Header';

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
      <Header title="Perfil" />
      <main>
        <h2 data-testid="profile-email">{ email }</h2>
        <Button
          variant="primary"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => setRoutes({ ...routes, redirectDone: true }) }
        >
          Receitas Feitas
        </Button>
        <Button
          variant="primary"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => setRoutes({ ...routes, redirectFavorites: true }) }
        >
          Receitas Favoritas
        </Button>
        <Button
          variant="primary"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            setRoutes({ ...routes, redirectLogout: true });
          } }
        >
          Sair
        </Button>
      </main>
    </>
  );
}
