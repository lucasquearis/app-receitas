// vitals
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
// styles
import '../styles/Profile.css';

function Profile() {
  const history = useHistory();

  const localStorageData = JSON.parse(localStorage.getItem('user'));

  const userMail = localStorageData
    ? localStorageData.email : 'Sem e-mail salvo no localStorage';

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="main-profile">
      <Header />
      <div
        data-testid="profile-email"
        className="email-container"
      >
        {/* { 'email:'`${userMail}` } */}
        { `email: ${userMail}` }
      </div>
      <div
        className="buttons-container"
      >
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => clearLocalStorage() }
          >
            Sair
          </button>
        </Link>
        <FooterMenu />
      </div>
    </div>
  );
}

export default Profile;
