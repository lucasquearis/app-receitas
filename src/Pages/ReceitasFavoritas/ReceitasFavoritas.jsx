import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../../Components/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Btn from '../../Components/Btn';

function ReceitasFavoritas() {
  const getFavoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favorite, setFavorite] = useState(getFavoriteStorage);
  const [copied, setCopied] = useState(false);

  function removeFavorite(event, id) {
    event.preventDefault();
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newArrayFavorite = favoriteStorage.filter((item) => item.id !== id);
    setFavorite(newArrayFavorite);
  }

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
  }, [favorite]);

  const allButtonProps = {
    name: 'All',
    'data-testid': 'filter-by-all-btn',
    type: 'button',
    variant: 'contained',
    onClick: () => setFavorite(getFavoriteStorage),
  };

  const foodButtonProps = {
    name: 'Food',
    'data-testid': 'filter-by-food-btn',
    type: 'button',
    variant: 'contained',
    onClick: () => setFavorite(favorite
      .filter((recipes) => recipes.type === 'comida')),
  };

  const drinksButtonProps = {
    name: 'Drinks',
    'data-testid': 'filter-by-drink-btn',
    type: 'button',
    variant: 'contained',
    onClick: () => setFavorite(favorite
      .filter((recipes) => recipes.type === 'bebida')),
  };

  return (
    <div>
      <Header
        title="Receitas Favoritas"
        searchButton={ false }
      />
      <div>
        <Btn { ...allButtonProps } />
      </div>
      <div>
        <Btn { ...foodButtonProps } />
      </div>
      <div>
        <Btn { ...drinksButtonProps } />
      </div>
      <div>
        {
          favorite.map((recipe, index) => (
            <div key={ index }>
              {recipe.type === 'bebida' ? (
                <div>
                  <Link
                    to={ `/bebidas/${recipe.id}` }
                  >
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      alt={ recipe.name }
                      src={ recipe.image }
                    />
                  </Link>
                  <Link to={ `/bebidas/${recipe.id}` }>
                    <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { recipe.alcoholicOrNot }
                  </p>
                  <button
                    type="button"
                    onClick={ () => {
                      clipboardCopy(`http://localhost:3000/bebidas/${recipe.id}`);
                      setCopied(true);
                    } }
                  >
                    { copied ? <span>Link copiado!</span> : <img
                      src={ shareIcon }
                      alt="compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                    /> }
                  </button>
                  <button
                    src={ blackHeartIcon }
                    type="button"
                    onClick={ (e) => removeFavorite(e, recipe.id) }
                  >
                    <img
                      src={ blackHeartIcon }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      alt="favorited"
                    />
                  </button>
                </div>
              ) : (
                <div key={ index }>
                  <Link
                    to={ `/comidas/${recipe.id}` }
                  >
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      alt={ recipe.name }
                      src={ recipe.image }
                    />
                  </Link>
                  <Link to={ `/comidas/${recipe.id}` }>
                    <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${recipe.area} - ${recipe.category}` }
                  </p>
                  <button
                    type="button"
                    onClick={ () => {
                      clipboardCopy(`http://localhost:3000/comidas/${recipe.id}`);
                      setCopied(true);
                    } }
                  >
                    { copied ? <span>Link copiado!</span> : <img
                      src={ shareIcon }
                      alt="compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                    /> }
                  </button>
                  <button
                    src={ blackHeartIcon }
                    type="button"
                    onClick={ (e) => removeFavorite(e, recipe.id) }
                  >
                    <img
                      src={ blackHeartIcon }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      alt="favorited"
                    />
                  </button>
                </div>
              ) }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ReceitasFavoritas;
