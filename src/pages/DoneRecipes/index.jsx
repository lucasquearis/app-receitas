import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ShareIcon from '../../components/Icons/ShareIcon';
import Context from '../../context';

const THREE_SECONDS = 3000;

function DoneRecipes() {
  const [activeFilter, setActiveFilter] = useState('');
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  const [copied, SetCopied] = useState(false);
  const { doneRecipes } = useContext(Context);

  useEffect(() => {
    setFilteredDoneRecipes(doneRecipes);
  }, [setFilteredDoneRecipes, doneRecipes]);

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
      setFilteredDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'comida'));
    }
    if (filter !== activeFilter && filter === 'Drinks') {
      setActiveFilter(filter);
      setFilteredDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'bebida'));
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

        const subpage = type === 'comida' ? 'comida' : 'bebida';

        return (
          <div key={ `${type}-${index}` }>
            {
              type === 'comida'
                ? (
                  <div>
                    <span
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${area} - ${category}`}
                    </span>
                  </div>
                ) : (
                  <span data-testid={ `${index}-horizontal-top-text` }>
                    {alcoholicOrNot}
                  </span>
                )
            }
            <Link to={ `/${subpage}s/${id}` } key={ `name-link/${id} ` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
            </Link>
            <h4 data-testid={ `${index}-horizontal-done-date` }>
              Feita em:
              { doneDate }
            </h4>
            <Link to={ `/${subpage}s/${id}` } key={ `img-link/${id} ` }>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <ShareIcon
              dataTestId={ `${index}-horizontal-share-btn` }
              url={ `/${subpage}s/${id}` }
              onClick={ handleCopy }
            />
            { copied && <div>Link copiado!</div> }
            {
              type === 'comida' ? (
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
