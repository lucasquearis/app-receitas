import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import copy from 'clipboard-copy';
import useFilterMadeAndFavorite from '../hooks/useFilterMadeAndFavorite';
import '../styles/made-recipes.css';
import CardMade from '../components/CardMade';
import CardFavorite from '../components/CardFavorite';

function MadeAndFavoriteRecipes() {
  const { madeRecipes, filter, setFilter, setRecipes } = useFilterMadeAndFavorite();
  const { pathname } = useLocation();
  const [copyMessage, setCopyMessage] = useState('none');
  const [shareId, setShareId] = useState('');
  const types = ['all', 'food', 'drink', 'All', 'Food', 'Drinks'];
  const numButtons = 3;

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
    <>
      <section>
        { types.slice(0, numButtons).map((item, index) => (
          <Button
            data-testid={ `filter-by-${item}-btn` }
            key={ item }
            variant="primary"
            value={ item }
            onClick={ filterType }
          >
            { types[index + numButtons] }
          </Button>
        )) }
      </section>
      <section>
        { fillCards() }
      </section>
    </>
  );
}

export default MadeAndFavoriteRecipes;
