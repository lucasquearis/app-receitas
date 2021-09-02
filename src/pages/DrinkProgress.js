import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DrinksIngredientsList from '../components/DrinkIngredientsList';
import MyContext from '../context';
import './pageCSS/DrinkProcess.css';

const DrinkProgress = (props) => {
  const { match: { params: { id } } } = props;
  const { checkedIngredients, resultAPIDrinks } = useContext(MyContext);
  const [isFullyChecked, setIsFullyChecked] = useState([false]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, cocktails: {} };
    const defaultObject = {
      ...getLocalStorage,
      cocktails: { ...getLocalStorage.cocktails,
        [id]: [] },
    };

    if (!getLocalStorage.cocktails[id]) {
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify(defaultObject));
    }
  }, [id]);

  useEffect(() => {
    if (resultAPIDrinks.length > 0
      && checkedIngredients.length > 0
      && checkedIngredients.length === Object.entries(resultAPIDrinks[0])
        .filter((string) => string[0]
          .includes('strIngredient') && string[1]).length) {
      setIsFullyChecked(true);
    } else {
      setIsFullyChecked(false);
    }
  }, [checkedIngredients, resultAPIDrinks]);

  return (
    <>
      <DrinksIngredientsList id={ id } />
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ !isFullyChecked }
        >
          Finalizar Receita
        </button>
      </Link>
    </>
  );
};

export default DrinkProgress;

DrinkProgress.propTypes = {
  id: PropTypes.number,
}.isRequired;
