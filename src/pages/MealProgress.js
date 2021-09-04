import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MealsIngredientsList from '../components/MealsIngredientsList';
import MyContext from '../context';
import './pageCSS/MealProcess.css';

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

  const handleClick = () => {
    const { strArea, strCategory, strMeal, strMealThumb, strTags } = resultAPIMeals[0];
    const parseLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const data = new Date();
    const defaultObject = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} `,
      tags: [strTags],
    };
    const verifyLocalStorage = parseLocalStorage.some((recipe) => recipe.id === id);
    if (!verifyLocalStorage) {
      localStorage
        .setItem('doneRecipes', JSON
          .stringify([...parseLocalStorage, defaultObject]));
    }
  };

  return (
    <>
      <MealsIngredientsList id={ id } />
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ handleClick }
          disabled={ !isFullyChecked }
        >
          Finalizar Receita
        </button>
      </Link>
    </>
  );
};

MealProgress.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default MealProgress;
