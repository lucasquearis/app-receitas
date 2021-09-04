import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MealsIngredientsList from '../components/MealsIngredientsList';
import MyContext from '../context';

const MealProgress = (props) => {
  const { match: { params: { id } } } = props;
  const { checkedIngredients, resultAPIMeals } = useContext(MyContext);
  const [isFullyChecked, setIsFullyChecked] = useState([false]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, cocktails: {} };
    const defaultObject = {
      ...getLocalStorage,
      meals: { ...getLocalStorage.meals,
        [id]: [] },
    };

    if (!getLocalStorage.meals[id]) {
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify(defaultObject));
    }
  }, [id]);

  useEffect(() => {
    if (resultAPIMeals.length > 0
      && checkedIngredients.length > 0
      && checkedIngredients.length === Object.entries(resultAPIMeals[0])
        .filter((string) => string[0]
          .includes('strIngredient') && string[1]).length) {
      setIsFullyChecked(true);
    } else {
      setIsFullyChecked(false);
    }
  }, [checkedIngredients, resultAPIMeals]);

  return (
    <div className="recipe-details__div">
      <MealsIngredientsList id={ id } />
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          className="recipe-progress__finish-btn"
          disabled={ !isFullyChecked }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
};

MealProgress.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default MealProgress;
