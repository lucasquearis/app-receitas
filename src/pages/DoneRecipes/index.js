import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import './styles.css';
import { getSavedAssistent } from '../../utils';
import CopyButton from '../../components/CopyButton';

function DoneRecipes() {
  const recipesDone = getSavedAssistent('doneRecipes');
  const [doneRecipes, setDoneRecipes] = useState(recipesDone);

  function mealInfo(index, category, area) {
    return (
      <p
        className="done-category"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${area} - ${category}`}
      </p>
    );
  }

  function drinkInfo(index, alcoholicOrNot) {
    return (
      <p
        className="done-category"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${alcoholicOrNot}`}
      </p>
    );
  }

  return (
    <>
      <Header>Receitas Feitas</Header>
      <div className="buttonfilter-container category-button-container">
        <button
          className="btn-filter category-button"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setDoneRecipes(recipesDone) }
        >
          All
        </button>
        <button
          className="btn-filter category-button"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setDoneRecipes(
            recipesDone.filter((data) => data.type === 'comida'),
          ) }
        >
          Food
        </button>
        <button
          className="btn-filter category-button"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setDoneRecipes(
            recipesDone.filter((data) => data.type === 'bebida'),
          ) }
        >
          Drink
        </button>
      </div>
      <section className="done-recipes-container">
        { doneRecipes.map((
          { category,
            id, type, doneDate, tags, image, area, alcoholicOrNot, name }, index,
        ) => (
          <div
            className="favorite-card"
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <Link to={ `/${type}s/${id}` }>
              <img
                className="recipe-image"
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
            </Link>
            <div className="favorite-infos">
              {type === 'comida' ? mealInfo(index, category, area)
                : drinkInfo(index, alcoholicOrNot)}
              <Link to={ `/${type}s/${id}` }>
                <p className="name" data-testid={ `${index}-horizontal-name` }>
                  {name}
                </p>
              </Link>
              <p className="date" data-testid={ `${index}-horizontal-done-date` }>
                Feita em:
                {doneDate}
              </p>
              <div className="done-tags">
                {tags.map((tag) => (
                  <p
                    className="tag"
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
            <CopyButton
              path={ `/${type}s/${id}` }
              index={ index }
            />
          </div>
        ))}
      </section>
    </>
  );
}

export default DoneRecipes;
