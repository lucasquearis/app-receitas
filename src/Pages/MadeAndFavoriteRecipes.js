import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import useFilterMadeAndFavorite from '../hooks/useFilterMadeAndFavorite';
import share from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/made-recipes.css';

function MadeRecipes() {
  const { madeRecipes, filter, setFilter, setRecipes } = useFilterMadeAndFavorite();
  const { pathname } = useLocation();
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

  const deleteFavorite = async (id) => {
    let recipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log('antes de deletar', recipes);
    recipes = recipes.filter((recipe) => recipe.id !== id);
    await localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    console.log('deleta receita', recipes);
    setRecipes(recipes);
  };

  const cardFoodMade = (recipe, index) => {
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
            <input
              data-testid={ `${index}-horizontal-share-btn` }
              className="icon-share"
              type="image"
              src={ share }
              alt="Compartilhar"
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

  const cardDrinkMade = (recipe, index) => {
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
            <input
              data-testid={ `${index}-horizontal-share-btn` }
              className="icon-share"
              type="image"
              src={ share }
              alt="Compartilhar"
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

  const cardFoodFavorite = (recipe, index) => {
    const { id, type, name, image, area, category } = recipe;
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
          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          <div className="card-favorite-share">
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              className="icon-share"
              src={ share }
              alt="Compartilhar"
            />
            <input
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="icon-favorite"
              type="image"
              src={ blackHeartIcon }
              alt="Favorite"
              onClick={ () => deleteFavorite(id) }
            />
          </div>
        </div>
      </div>
    );
  };

  const cardDrinkFavorite = (recipe, index) => {
    const { id, type, name, image, alcoholicOrNot } = recipe;

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
          <span data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</span>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          <div className="card-favorite-share">
            <input
              data-testid={ `${index}-horizontal-share-btn` }
              className="icon-share"
              type="image"
              src={ share }
              alt="Compartilhar"
            />
            <input
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="icon-favorite"
              type="image"
              src={ blackHeartIcon }
              alt="Favorite"
              onClick={ () => deleteFavorite(id) }
            />
          </div>
        </div>
      </div>
    );
  };

  const fillCards = () => {
    if (!madeRecipes) return <span>Nenhuma receita feita</span>;
    console.log('carrega cards');

    return madeRecipes.map((recipe, index) => {
      if (recipe.type === 'comida') {
        return pathname === '/receitas-feitas'
          ? cardFoodMade(recipe, index)
          : cardFoodFavorite(recipe, index);
      }
      return pathname === '/receitas-feitas'
        ? cardDrinkMade(recipe, index)
        : cardDrinkFavorite(recipe, index);
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
