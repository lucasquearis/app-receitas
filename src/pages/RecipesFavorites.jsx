import React, { useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipesFavorites.css';

export default function RecipesFavorites() {
  const [unfavorite, setUnfavorite] = useState(false);

  function getFavorites() {
    const storedFavorites = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    return storedFavorites;
  }

  function handleClick(id) {
    setUnfavorite(true);
    const editedFavorites = getFavorites().filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(editedFavorites));
  }

  function renderArea(item) {
    return (
      <p key={ item.area }>
        { item.area }
      </p>
    );
  }

  function renderAlcoholic(item) {
    return (
      <p key={ item.alcoholicOrNot }>
        { item.alcoholicOrNot }
      </p>
    );
  }

  function renderFavorites() {
    return getFavorites().map((item, index) => (
      <div key={ item.id } className="favorite-card">
        <img
          className="recipe-pic"
          key={ item.image }
          src={ item.image }
          alt="favorite recipe"
          data-testid={ `${index}-horizontal-image` }
        />
        <p key={ item.category } data-testid={ `${index}-horizontal-top-text` }>
          { item.category }
        </p>
        { item.type === 'comida' && renderArea(item) }
        { item.type === 'bebida' && renderAlcoholic(item) }
        <h3 key={ item.name } data-testid={ `${index}-horizontal-name` }>
          { item.name }
        </h3>
        <button type="button">
          <img
            src={ shareIcon }
            alt="share icon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button
          className="unfavorite-btn"
          key={ item.id }
          type="button"
          onClick={ () => handleClick(item.id) }
        >
          <img
            src={ unfavorite ? whiteHeartIcon : blackHeartIcon }
            alt="favorited icon"
            data-testid={ `${index}-horizontal-unfavorite-btn` }
          />
        </button>
      </div>
    ));
  }

  return (
    <main>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { renderFavorites() }
    </main>
  );
}
