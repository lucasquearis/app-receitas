import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import searchFoodId from '../services/Header-SearchBar/Foods/searchFoodId';
import '../pages/pageCSS/MealProcess.css';
import Loading from './Loading';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import MyContext from '../context';

const MealsIngredientsList = ({ id }) => {
  const {
    checkedIngredients,
    setCheckedIngredients,
    resultAPIMeals,
    setResultAPIMeals } = useContext(MyContext);
  const [linkShare, setLinkShare] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);

  useEffect(() => {
    const parseLocalStorage = JSON
      .parse(localStorage
        .getItem('favoriteRecipes')) || [];
    const verifyFavorite = parseLocalStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
  }, [id, favoriteRecipe]);

  useEffect(() => {
    const resolveAPIMeals = async () => {
      const { meals } = await searchFoodId(id);
      setResultAPIMeals(meals);
    };
    resolveAPIMeals();
    const { meals } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: { [id]: [] } };
    if (meals[id]) {
      setCheckedIngredients([...meals[id]]);
    }
  }, [id, setCheckedIngredients, setResultAPIMeals]);

  const handleClick = ({ target: { name } }) => {
    const getLocalStorage = () => JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: { [id]: [name] } };

    const removeIngredient = getLocalStorage().meals[id]
      .filter((ingredient) => ingredient !== name);

    const isOnList = getLocalStorage().meals[id].includes(name);

    if (!isOnList) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({
          ...getLocalStorage(),
          meals: { ...getLocalStorage().meals,
            [id]: [...getLocalStorage().meals[id],
              name] } }));
      return false;
    }

    localStorage.setItem('inProgressRecipes', JSON
      .stringify({
        ...getLocalStorage(),
        meals: { ...getLocalStorage().meals,
          [id]: removeIngredient } }));
  };

  const updateStateFromLocalStorage = () => {
    const { meals } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: { [id]: [] } };
    setCheckedIngredients([...meals[id]]);
  };

  const isIngredientChecked = (comparison) => checkedIngredients
    .some((ingredient) => ingredient === comparison);

  if (resultAPIMeals.length > 0) {
    const {
      strMealThumb,
      strMeal,
      strCategory,
      strArea,
      strInstructions,
    } = resultAPIMeals[0];

    const listFromKeys = Object.keys(resultAPIMeals[0]);
    const filteredIngredients = listFromKeys
      .filter((item) => item
        .includes('strIngredient'));
    const filteredMeasures = listFromKeys
      .filter((item) => item
        .includes('strMeasure'));
    return (
      <>
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        <h1 data-testid="recipe-title">{ strMeal }</h1>
        <FavoriteButton
          id={ id }
          type="comida"
          category={ strCategory }
          alcoholicOrNot=""
          name={ strMeal }
          image={ strMealThumb }
          favoriteRecipe={ favoriteRecipe }
          setFavoriteRecipe={ setFavoriteRecipe }
          area={ strArea }
        />
        <ShareButton
          id={ id }
          setLinkShare={ setLinkShare }
          type="comidas"
        />
        {linkShare && 'Link copiado!'}
        <p data-testid="recipe-category">{ strCategory }</p>
        <ul className="progress__checkbox-list">
          {filteredIngredients.map((ingredient, index) => {
            if (resultAPIMeals[0][ingredient]) {
              return (
                <li
                  data-testid={ `${index}-ingredient-step` }
                  key={ ingredient }
                >
                  <input
                    name={ resultAPIMeals[0][ingredient] }
                    type="checkbox"
                    id={ `${ingredient}-checkbox` }
                    onClick={ handleClick }
                    onChange={ updateStateFromLocalStorage }
                    checked={ isIngredientChecked(resultAPIMeals[0][ingredient]) }
                  />
                  <span>
                    {resultAPIMeals[0][ingredient]}
                    {' '}
                    -
                    {' '}
                    { resultAPIMeals[0][filteredMeasures[index]] }
                  </span>
                </li>
              );
            }
            return true;
          })}
        </ul>
        <p data-testid="instructions">{ strInstructions }</p>
      </>
    );
  }
  return <Loading />;
};
export default MealsIngredientsList;

MealsIngredientsList.propTypes = {
  id: PropTypes.number,
}.isRequired;
