import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import useFilterMade from '../hooks/useFilterMade';
import share from '../images/shareIcon.svg';
import '../styles/made-recipes.css';

function MadeRecipes() {
  const { madeRecipes, filter, setFilter } = useFilterMade();
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

  const cardFood = (recipe, index) => {
    const { id, type, name, image, area, category, doneDate, tags } = recipe;
    return (
      <div key={ index } className="card-done">
        <Link to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="img-card-done"
            src={ image }
            alt={ name }
          />
        </Link>
        <div className="card-done-infos">
          <div className="card-done-share">
            <span data-testid={ `${index}-horizontal-top-text` }>
              { `${area} - ${category}` }
            </span>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              className="icon-share"
              src={ share }
              alt={ name }
            />
          </div>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
          <div className="card-done-tags">
            { tags.map((tag) => (
              <div
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                { tag }
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const cardDrink = (recipe, index) => {
    const { id, type, name, image, alcoholicOrNot, doneDate } = recipe;

    return (
      <div key={ index } className="card-done">
        <Link to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="img-card-done"
            src={ image }
            alt={ name }
          />
        </Link>
        <div className="card-done-infos">
          <div className="card-done-share">
            <span data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</span>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              className="icon-share"
              src={ share }
              alt={ name }
            />
          </div>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
        </div>
      </div>
    );
  };

  const fillCards = () => {
    if (!madeRecipes) return <span>Nenhuma receita feita</span>;

    return madeRecipes.map((recipe, index) => {
      if (recipe.type === 'comida') {
        return cardFood(recipe, index);
      }
      return cardDrink(recipe, index);
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

export default MadeRecipes;
