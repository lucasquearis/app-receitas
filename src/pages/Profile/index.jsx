import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Context from '../../context';

function Profile() {
  const { email } = useContext(Context);
  return (
    <div>
      <Header title="Perfil" renderSearchIcon={ false } />
      <div>
        <div><h4 data-testid="profile-email">{ email }</h4></div>
        <div>
          <NavLink to="/receitas-feitas">
            <button
              type="button"
              data-testeid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/receitas-favoritas">
            <button
              type="button"
              data-testeid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/">
            <button
              type="button"
              data-testeid="profile-logout-btn"
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
