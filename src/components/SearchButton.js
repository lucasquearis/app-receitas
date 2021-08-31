import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';

function SearchButton({ name, datatestid }) {
  const {
    filter: { search, type, src },
    RequestAPI,
    foodRecipes,
    drinkRecipes,
    foodRecipes: { loading: foodLoading },
    drinkRecipes: { loading: drinkLoading },
  } = useContext(Context);

  const handleClick = () => RequestAPI();
  const loading = () => drinkLoading || foodLoading;

  return (
    <button
      data-testid={ datatestid }
      onClick={ () => handleClick() }
      type="button"
      disabled={ search === '' || type === '' }
    >
      {!loading()
      && src === 'meal'
      && foodRecipes.list.meals !== null
      && foodRecipes.list.meals.length === 1
      && <Redirect to={ `/comidas/${foodRecipes.list.meals[0].idMeal}` } />}
      {loading()
      && src === 'cocktail'
      && drinkRecipes.list.drinks !== null
      && drinkRecipes.list.drinks.length === 1
      && <Redirect to={ `/bebidas/${drinkRecipes.list.drinks[0].idDrink}` } />}
      { name }
    </button>
  );
}

SearchButton.propTypes = {
  name: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
};

export default SearchButton;
