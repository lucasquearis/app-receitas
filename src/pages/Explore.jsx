import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function Explore() {
  const history = useHistory();
  return (
    <>
      <div>
        <h1 data-testid="page-title">Explorar</h1>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Botão que direciona para a tela de perfil"
        />
      </div>
      <div>
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
