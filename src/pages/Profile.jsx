import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const history = useHistory();
  const localStorageData = JSON.parse(localStorage.getItem('user'));

  const userMail = localStorageData
    ? localStorageData.email : 'Nenhum e-mail cadastrado';

  return (
    <div>
      <Header name="Perfil" />
      <div
        className="profile-email"
        data-testid="profile-email"
      >
        <h4>Usuário:</h4>
        {userMail}
      </div>
      <div className="profile-container">
        <button
          className="profile-btns"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }

        >
          Receitas Feitas
        </button>
        <button
          className="profile-btns"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }

        >
          Receitas Favoritas
        </button>
        <button
          className="profile-btns"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            history.push('/');
            localStorage.clear();
          } }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
