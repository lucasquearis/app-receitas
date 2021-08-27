// vitals
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// styles
import '../styles/Header.css';
import profilePicture from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

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

const renderSearchButton = (showSearchBar, setShowSearchBar) => (
  <input
    type="image"
    className="header-button"
    onClick={ () => { setShowSearchBar(!showSearchBar); } }
    src={ searchIcon }
    alt="Ícone que indica o botão pra ativar a barra de busca"
    data-testid="search-top-btn"
  />
);

function Header() {
  // states
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;

  // Ao renderizar o componente vai verificar a URL, e se for uma URL elegível pra ter o botão da lupa,
  // irá setar a variável como true
  useEffect(() => {
    if (pathname === '/comidas'
      || pathname === '/bebidas'
      || pathname.endsWith('/area')) {
      setShowSearchButton(true);
    }
  }, [pathname]);

  return (
    <>
      <header className="header-div">
        <input
          type="image"
          className="header-button"
          onClick={ () => history.push('/profile') }
          src={ profilePicture }
          alt="Ícone que indica o botão pra ir para o perfil de usuário"
          data-testid="profile-top-btn"
        />
        <div>
          <h1
            data-testid="page-title"
          >
            {renderTitle(pathname)}
          </h1>
        </div>
        <div>
          {showSearchButton ? renderSearchButton(showSearchBar, setShowSearchBar) : null }
        </div>
      </header>
      <div>
        {showSearchBar
          ? <SearchBar />
          : ''}
      </div>
    </>
  );
}

export default Header;
