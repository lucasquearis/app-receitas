import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';

function Comidas() {
  return (
    <div>
      <header>
        <Link to="/perfil">
          <img src={ ProfileIcon } alt="Profile icon" />
        </Link>
      </header>
      <div>retorna Comidas</div>
    </div>
  );
}

export default Comidas;
