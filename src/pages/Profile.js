import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      setUserEmail(JSON.parse(localStorage.getItem('user')).email);
    }
  }, []);

  const logoutButton = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Perfil" />
      { typeof userEmail === 'string' && userEmail.length > 0
        && (
          <div className="profile-container">
            <p
              data-testid="profile-email"
              className="profile-email"
            >
              { userEmail }
            </p>
            <Link to="/receitas-feitas">
              <button
                type="button"
                data-testid="profile-done-btn"
                className="profile-button"
              >
                Receitas Feitas
              </button>
            </Link>
            <Link to="/receitas-favoritas">
              <button
                type="button"
                data-testid="profile-favorite-btn"
                className="profile-button"
              >
                Receitas Favoritas
              </button>
            </Link>
            <Link to="/">
              <button
                type="button"
                data-testid="profile-logout-btn"
                onClick={ logoutButton }
                className="profile-logout-button"
              >
                Sair
              </button>
            </Link>
          </div>
        )}
      <Footer />
    </div>
  );
}

export default Profile;
