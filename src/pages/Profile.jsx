import { Button } from 'bootstrap';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import useLogout from '../hooks/useLogout';
import useRedirect from '../hooks/useRedirect';

function Profile() {
  const { user } = useSelector((state) => state.login);

  const storageUser = JSON.parse(localStorage.getItem('user'));

  const { redirect, shouldRedirect } = useRedirect();

  const handleLogout = useLogout();

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <div>
      <HeaderWithoutSearch />
      <h3 data-testid="profile-email">{user || storageUser.email}</h3>
      <Button
        variant="success"
        data-testid="profile-done-btn"
        onClick={ () => shouldRedirect('/receitas-feitas') }
      >
        Receitas Feitas
      </Button>
      <Button
        variant="warning"
        data-testid="profile-favorite-btn"
        onClick={ () => shouldRedirect('/receitas-favoritas') }
      >
        Receitas Favoritas
      </Button>
      <Button
        variant="danger"
        data-testid="profile-logout-btn"
        onClick={ () => {
          shouldRedirect('/');
          handleLogout();
        } }
      >
        Sair
      </Button>
      <Footer />
    </div>
  );
}

export default Profile;
