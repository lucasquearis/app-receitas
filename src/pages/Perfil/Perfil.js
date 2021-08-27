import React from 'react';
import Button from '../../components/Button';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header';
import './Perfil.css';

function Perfil() {
  let emailObject = {};
  if (localStorage.getItem('user'))emailObject = JSON.parse(localStorage.getItem('user'));
  const { email } = emailObject;

  return (
    <div className="perfil-container">
      <Header label="Perfil" Search={ () => '' } />
      <br />
      <br />
      <br />
      <Footer />
      <h5 data-testid="profile-email">{email}</h5>
      <section className="perfil-buttons">
        <Button
          link="/receitas-favoritas"
          type="button"
          name="Receitas Favoritas"
          className="perfil-btn"
          testId="profile-favorite-btn"
        />
        <Button
          link="/receitas-feitas"
          type="button"
          name="Receitas Feitas"
          className="perfil-btn"
          testId="profile-done-btn"
        />
        <Button
          link="/"
          type="button"
          name="Sair"
          testId="profile-logout-btn"
          className="logout-btn"
          onClick={ () => localStorage.clear() }
        />
      </section>
    </div>

  );
}

export default Perfil;
