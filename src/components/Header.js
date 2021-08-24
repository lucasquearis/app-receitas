// vitals
import React, { useState } from 'react';
import { useHistory } from 'react-router';
// styles
import '../styles/Header.css';
import profilePicture from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <>
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
        <button
          type="button"
          className="search-button"
          onClick={ () => { setShowSearchBar(!showSearchBar); } }
        >
          <img
            src={ searchIcon }
            alt="Ícone que indica o botão pra ativar a barra de busca"
          />
        </button>
      </header>
      <div>
        {showSearchBar
          ? 'SearchBar Component'
          : 'not showing '}
      </div>
    </>
  );
}

export default Header;
