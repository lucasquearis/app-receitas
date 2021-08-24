// vitals
import React from 'react';
import { useHistory } from 'react-router';
// styles
import '../styles/Header.css';
import profilePicture from '../images/profileIcon.svg';

const renderTitle = (path) => {
  if (path.endsWith('/ingredientes')) return 'Explorar Ingredientes';
  if (path.endsWith('/area')) return 'Explorar Origem';

  const possiblePaths = {
    '/comidas': 'Comidas',
    '/bebidas': 'Bebidas',
    '/perfil': 'Perfil',
    '/explorar/comidas': 'Explorar Comidas',
    '/explorar/bebidas': 'Explorar Bebidas',
    '/receitas-feitas': 'Receitas Feitas',
    '/receitas-favoritas': 'Receitas Favoritas',
  };

  return `${possiblePaths[path]}`;
};

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;
  console.log(pathname);

  return (
    <header className="header-div">
      <div>
        <img
          src={ profilePicture }
          alt="Ícone que indica o botão pra ir para o perfil de usuário"
        />
      </div>
      <div>
        <h1>{renderTitle(pathname)}</h1>
      </div>
      <div>Botão de busca</div>
    </header>
  );
}

export default Header;
