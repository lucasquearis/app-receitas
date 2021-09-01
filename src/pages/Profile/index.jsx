import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import './style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const headerProps = {
    title: 'Perfil',
    renderSearchBar: false,
  };
  return (
    <div className="profile">
      <Header { ...headerProps } />
      <Typography variant="h5" component="h2" data-testid="profile-email">
        { user && user.email }
      </Typography>
      <Link to="/receitas-feitas">
        <Button
          color="default"
          variant="contained"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </Button>
      </Link>
      <Link to="/receitas-favoritas">
        <Button
          color="default"
          variant="contained"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Button>
      </Link>
      <Link to="/">
        <Button
          color="default"
          variant="contained"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </Button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
