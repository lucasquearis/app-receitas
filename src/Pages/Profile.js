import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../Component/Header';
import Footer from '../Component/Footer';

function Profile() {
  const mailUser = JSON.parse(localStorage.getItem('user'));
  let getUser = '';
  if (mailUser) {
    getUser = mailUser.email;
  }
  return (
    <section className="profile-page">
      <Header titlePage=" Perfil " />
      <p className="profile-card" />
      <p className="profile">Meu Perfil</p>
      <p data-testid="profile-email" className="email">{ getUser }</p>
      <Form>
        <Link to="/receitas-feitas">
          <Button
            className="btn-done"
            variant="primary"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </Button>
        </Link>
        <Link to="/receitas-favoritas">
          <Button
            className="btn-favorite"
            variant="primary"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </Button>
        </Link>
        <Link to="/">
          <Button
            className="btn-logout"
            variant="primary"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </Button>
        </Link>
      </Form>
      <Footer />
    </section>
  );
}

export default Profile;
