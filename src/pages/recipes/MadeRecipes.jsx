import React from 'react';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';

function MadeRecipes() {
  return (
    <>
      <Header title="Receitas Feitas" />

      MadeRecipes

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
      <img
        src={ image }
        alt=""
        data-testid={ `${index}-horizontal-image` }
      />

      <p data-testid={ `${index}-horizontal-top-text` } />
      <h3 data-testid={ `${index}-horizontal-name` }>{}</h3>
      <p data-testid={ `${index}-horizontal-done-date` }>{}</p>
      <button type="button">
        <img
          src={ shareIcon }
          alt=""
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <p
        key={ tag }
        data-testid={ `${index}-${tag}-horizontal-tag` }
      />
    </>
  );
}

export default MadeRecipes();
