import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function DoneRecipes() {
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    setDoneList(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  return (
    <div>
      <Header title="Receitas Feitas" />
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
      { doneList && doneList.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt="Foto do Prato"
          />
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipe.type === 'comida'
              ? recipe.area
              : recipe.alcoholicOrNot} - ${recipe.category}` }
          </h3>
          <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          <ShareButton index={ index } address={ `/${recipe.type}s/${recipe.id}` } />
          {recipe.tags.map(
            (tag) => (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </p>
            ),
          )}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
