import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import doneRecipes from './mockDoneRecipes';

function DoneRecipes() {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('');
  let filteredDoneRecipes = doneRecipes;

  useEffect(() => {
    switch (activeFilter) {
    case 'Food':
      filteredDoneRecipes = doneRecipes.filter(
        (recipe) => recipe.type === 'meals',
      );
      setLoading(false);
      return filteredDoneRecipes;
    case 'Drinks':
      filteredDoneRecipes = doneRecipes.filter(
        (recipe) => recipe.type === 'drinks',
      );
      setLoading(false);
      return filteredDoneRecipes;
    default:
      setLoading(false);
      return filteredDoneRecipes;
    }
  }, [activeFilter, setActiveFilter]);

  const handleRemoveFilter = () => {
    setActiveFilter('');
  };

  const handleFilter = ({ target }) => {
    if (target.innerHTML === activeFilter) {
      handleRemoveFilter();
      setActiveFilter('');
    } else {
      setActiveFilter(target.innerHTML);
    }
  };

  if (loading) return 'Loading';

  return (
    <div>
      <button
        type="button"
        onClick={ handleRemoveFilter }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        key="food"
        onClick={ handleFilter }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        key="drinks"
        onClick={ handleFilter }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      {filteredDoneRecipes.map((recipe, index) => {
        const { id, type, category, name, image, doneDate, tags } = recipe;

        const subpage = type === 'meals' ? 'comidas' : 'bebidas';

        return (
          <div key="done-recipe-card">
            <h2 data-testid={ `${index}-horizontal-top-text` }>{category}</h2>
            <Link to={ `/${subpage}/${id}` } key={ id }>
              <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
            </Link>
            <h4 data-testid={ `${index}-horizontal-done-date` }>
              Feita em:
              { doneDate }
            </h4>
            <Link to={ `/${subpage}/${id}` } key={ id }>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src=""
              alt="Ícone compartilhar"
            />
            <div data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{tags[0]}</div>
            <div data-testid={ `${index}-${tags[1]}-horizontal-tag` }>{tags[1]}</div>
          </div>
        );
      })}
    </div>
  );
}

export default DoneRecipes;
