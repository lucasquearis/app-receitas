import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import doneRecipes from './mockDoneRecipes';

function DoneRecipes() {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('');
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);

  useEffect(() => {
    setFilteredDoneRecipes(doneRecipes);
    setLoading(false);
  }, [setFilteredDoneRecipes, setLoading]);

  const handleRemoveFilter = () => {
    setActiveFilter('');
    setFilteredDoneRecipes(doneRecipes);
  };

  const handleFilter = ({ target }) => {
    if (target.innerHTML === activeFilter) {
      handleRemoveFilter();
      setFilteredDoneRecipes(doneRecipes);
    }
    if (target.innerHTML !== activeFilter && target.innerHTML === 'Food') {
      setActiveFilter(target.innerHTML);
      setFilteredDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'meals'));
    }
    if (target.innerHTML !== activeFilter && target.innerHTML === 'Drinks') {
      setActiveFilter(target.innerHTML);
      setFilteredDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'drinks'));
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
        const {
          id,
          type,
          category,
          area,
          name,
          image,
          doneDate,
          tags,
          alcoholicOrNot,
        } = recipe;

        const subpage = type === 'meals' ? 'comidas' : 'bebidas';

        return (
          <div key={ `${type}-${index}` }>
            {
              type === 'meals'
                ? (
                  <div>
                    <span data-testid={ `${index}-horizontal-top-text` }>{category}</span>
                    <span data-testid={ `${index}-horizontal-top-text` }>{area}</span>
                  </div>
                ) : (
                  <span data-testid={ `${index}-horizontal-top-text` }>
                    {alcoholicOrNot}
                  </span>
                )
            }
            <Link to={ `/${subpage}/${id}` } key={ `name-link/${id} ` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
            </Link>
            <h4 data-testid={ `${index}-horizontal-done-date` }>
              Feita em:
              { doneDate }
            </h4>
            <Link to={ `/${subpage}/${id}` } key={ `img-link/${id} ` }>
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
            {
              type === 'meals' ? (
                <div>
                  <div data-testid={ `${index}-${tags[0]}-horizontal-tag` }>
                    {tags[0]}
                  </div>
                  <div data-testid={ `${index}-${tags[1]}-horizontal-tag` }>
                    {tags[1]}
                  </div>
                </div>
              ) : <span />
            }
          </div>
        );
      })}
    </div>
  );
}

export default DoneRecipes;
