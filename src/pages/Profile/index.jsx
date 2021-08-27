import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Context from '../../context';

function Profile() {
  const { email, setEmail } = useContext(Context);

  useEffect(() => {
    if (localStorage.length === 0) {
      setEmail('email@email.com');
    } if (localStorage.length !== 0) {
      setEmail(JSON.parse(localStorage.user).email);
    }
  }, [setEmail]);

  const clearLocalStorage = () => {
    if (localStorage.length > 0) {
      localStorage.clear();
      setEmail('');
    }
  };

  return (
    <div>
      <Header title="Perfil" renderSearchIcon={ false } />
      <div>
        <div><h4 data-testid="profile-email">{ email }</h4></div>
        <div>
          <NavLink to="/receitas-feitas">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/receitas-favoritas">
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => clearLocalStorage() }
            >
              Sair
            </button>
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
