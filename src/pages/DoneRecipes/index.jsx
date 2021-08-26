import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import doneRecipes from './mockDoneRecipes';
import ShareIcon from '../../components/Icons/ShareIcon';

const THREE_SECONDS = 3000;

function DoneRecipes() {
  const [activeFilter, setActiveFilter] = useState('');
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  const [copied, SetCopied] = useState(false);

  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    setFilteredDoneRecipes(doneRecipes);
    // Por doneRecipes nas depêndencias quando trocar pro localStorage
  }, [setFilteredDoneRecipes]);

  const handleCopy = () => {
    SetCopied(true);
    setTimeout(() => { SetCopied(false); }, THREE_SECONDS);
  };

  const handleRemoveFilter = () => {
    setActiveFilter('');
    setFilteredDoneRecipes(doneRecipes);
  };

  const handleFilter = ({ target }) => {
    const filter = target.innerHTML;
    if (filter === activeFilter) {
      handleRemoveFilter();
      setFilteredDoneRecipes(doneRecipes);
    }
    if (filter !== activeFilter && filter === 'Food') {
      setActiveFilter(filter);
      setFilteredDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'meals'));
    }
    if (filter !== activeFilter && filter === 'Drinks') {
      setActiveFilter(filter);
      setFilteredDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'drinks'));
    }
  };

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
            <ShareIcon
              data-testid={ `${index}-horizontal-share-btn` }
              url={ `/receitas-feitas/${index}` }
              onClick={ handleCopy }
            />
            { copied && <div>Copiado!</div> }
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
