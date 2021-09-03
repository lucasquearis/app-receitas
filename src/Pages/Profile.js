import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../styles/profile.css';

function Profile() {
  const mailUser = JSON.parse(localStorage.getItem('user'));
  let getUser = '';
  if (mailUser) {
    getUser = mailUser.email;
  }
  return (
    <div className="profile-page">
      <Header titlePage=" Perfil " />
      <div className="profile-card">
        <p className="profile">Meu Perfil</p>
        <p data-testid="profile-email" className="email">{ getUser }</p>
        <Form>
          <Link to="/receitas-feitas">
            <button
              className="button-general"
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              className="button-general"
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link to="/">
            <button
              className="button-general"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </button>
          </Link>
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
