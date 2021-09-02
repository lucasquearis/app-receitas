import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import useFilterMadeAndFavorite from '../hooks/useFilterMadeAndFavorite';
import CardMade from '../components/CardMade';
import CardFavorite from '../components/CardFavorite';
import Header from '../Component/Header';
import '../styles/made-favorite-recipes.css';

function MadeAndFavoriteRecipes() {
  const { madeRecipes, filter, setFilter, setRecipes } = useFilterMadeAndFavorite();
  const { pathname } = useLocation();
  const [copyMessage, setCopyMessage] = useState('none');
  const [shareId, setShareId] = useState('');
  const types = ['all', 'food', 'drink', 'All', 'Food', 'Drinks'];
  const numButtons = 3;
  let pag = 'Receitas Feitas';

  if (pathname === '/receitas-favoritas') {
    pag = 'Receitas Favoritas';
  }

  const filterType = ({ target: { value } }) => {
    const type = {
      all: 'all',
      food: 'comida',
      drink: 'bebida',
    };

    if (filter === type[value]) {
      setFilter('all');
    } else {
      setFilter(type[value]);
    }
  };

  const deleteFavorite = async (id) => {
    let recipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    recipes = recipes.filter((recipe) => recipe.id !== id);
    await localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    setRecipes(recipes);
  };

  const copyPath = (urlDetails, id) => {
    copy(`http://localhost:3000${urlDetails}`);
    setShareId(id);
    setCopyMessage('block');
  };

  const fillCards = () => {
    if (!madeRecipes) return <span>Nenhuma receita feita</span>;

    return madeRecipes.map((recipe, index) => {
      if (pathname === '/receitas-feitas') {
        return (
          <CardMade
            key={ index }
            recipe={ recipe }
            index={ index }
            copyPath={ copyPath }
            copyMessage={ copyMessage }
            shareId={ shareId }
          />
        );
      }

      return (
        <CardFavorite
          key={ index }
          recipe={ recipe }
          index={ index }
          copyPath={ copyPath }
          copyMessage={ copyMessage }
          shareId={ shareId }
          deleteFavorite={ deleteFavorite }
        />
      );
    });
  };

  return (
    <div className="pag-made-favorite">
      <Header titlePage={ pag } />
      <section className="container-button-filter">
        { types.slice(0, numButtons).map((item, index) => (
          <button
            data-testid={ `filter-by-${item}-btn` }
            className="button-filter"
            type="button"
            key={ item }
            variant="primary"
            value={ item }
            onClick={ filterType }
          >
            { types[index + numButtons] }
          </button>
        )) }
      </section>
      <section className="container-cards">
        { fillCards() }
      </section>
    </div>
  );
}

export default MadeAndFavoriteRecipes;
