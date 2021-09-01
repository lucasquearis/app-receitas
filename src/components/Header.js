import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import '../styles/Header.css';
import { useParams } from 'react-router-dom';
import profilePicture from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Filter from './Filter';

const renderTitle = (path) => {
  if (path.endsWith('/ingredientes')) return 'Explorar Ingredientes';
  if (path.endsWith('/area')) return 'Explorar Origem';

  const possiblePaths = {
    '/comidas': 'Comidas',
    '/bebidas': 'Bebidas',
    '/perfil': 'Perfil',
    '/explorar/comidas': 'Explorar Comidas',
    '/explorar/comidas/ingredientes': 'Explorar Comidas',
    '/explorar/bebidas': 'Explorar Bebidas',
    '/receitas-feitas': 'Receitas Feitas',
    '/receitas-favoritas': 'Receitas Favoritas',
    '/explorar': 'Explorar',
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
  const { id } = useParams();
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

  const toggleFilter = pathname.includes('explorar')
    || pathname.includes('ingredientes')
    || pathname.includes(id)
    || pathname.includes('perfil')
    || pathname.includes('area')
    || pathname.includes('receita')
    || pathname.includes('perfil');
  return (
    <>
      <header className="header-div">
        <input
          type="image"
          className="header-button"
          onClick={ () => history.push('/perfil') }
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
      <div>
        { !toggleFilter && <Filter />}
      </div>

    </>
  );
}

export default Header;
