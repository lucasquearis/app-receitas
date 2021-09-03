import React from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const reduxEmail = useSelector((state) => state.user.email);
  const userStorage = JSON.parse(localStorage.getItem('user'));
  const storageEmail = userStorage && userStorage.email;

  const exitApp = () => {
    localStorage.clear();
  };

  return (
    <section className="body">
      <Header showExploreIcon pageTitle="Perfil" />
      <main className="d-flex flex-column w-100 p-3">
        <div>
          <h3>Email:</h3>
          <h3 data-testid="profile-email">
            {!reduxEmail ? storageEmail : reduxEmail}
          </h3>
        </div>
        <div className="d-flex flex-column pb-2">
          <Link
            className="w-100"
            to="/receitas-feitas"
          >
            <Button
              style={ { 'font-size': '20pt' } }
              className="border bg-color w-100  mt-2"
              data-testid="profile-done-btn"
              type="button"
            >
              Receitas Feitas
            </Button>
          </Link>
          <Link
            className="w-100"
            to="/receitas-favoritas"
          >
            <Button
              style={ { 'font-size': '20pt' } }
              className="border bg-color w-100 mt-2"
              data-testid="profile-favorite-btn"
              type="button"
            >
              Receitas Favoritas
            </Button>
          </Link>
          <Link
            className="w-100"
            to="/"
          >
            <Button
              style={ { 'font-size': '20pt' } }
              className="border bg-color w-100 mt-2"
              onClick={ exitApp }
              data-testid="profile-logout-btn"
              type="button"
            >
              Sair
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </section>
  );
}
