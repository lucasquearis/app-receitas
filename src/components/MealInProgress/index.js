import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';
import { Button } from 'react-bootstrap';
import { getFood } from '../../services/foodAPI';
import { doesItExist, doesInprogressExist } from '../../utils';
import {
  // FOOD_ERROR_RESPONSE,
  NEW_FOOD_SEARCH,
  FOOD_RESPONSE } from '../../redux/reducers/foodReducer';
import Ingredients from '../Ingredients';
import DetailsButtonsField from '../DetailsButtonsField';
import Loading from '../Loading';
import './style.css';

const MealInProgress = () => {
  const history = useHistory();
  const loading = useSelector(({ food }) => food.loading);
  const meals = useSelector(({ food }) => food.meals);
  const error = useSelector(({ food }) => food.error);
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [disabled, setDisabled] = useState(true);
  const maxIngredients = 20;

  useEffect(() => {
    const fetchFood = async () => {
      // try {
      dispatch({ type: NEW_FOOD_SEARCH });
      const response = await getFood(id, 'id');
      dispatch({ type: FOOD_RESPONSE, payload: response });
      // } catch (error) {
      //   console.log(error);
      //   dispatch({ type: FOOD_ERROR_RESPONSE });
      // }
    };
    fetchFood();
  }, [id, dispatch, location]);

  const handleFavorite = () => {
    const { idMeal, strMeal, strMealThumb, strCategory, strArea } = meals[0];
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const oldFavorites = doesItExist(favoriteRecipes);
    if (!oldFavorites.some((recipe) => recipe.id === idMeal)) {
      const newFavorites = [
        ...oldFavorites,
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const newFavorites = oldFavorites.filter((recipe) => recipe.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };

  const handleFinish = () => {
    const { idMeal, strMeal, strMealThumb, strCategory, strArea, strTags } = meals[0];
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getInprogress = doesInprogressExist(inProgressRecipes);
    if (getInprogress.meals[idMeal]) delete getInprogress.meals[idMeal];
    localStorage.setItem('inProgressRecipes', JSON.stringify(getInprogress));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const oldDoneRecipes = doesItExist(doneRecipes);
    const newDoneRecipes = [
      ...oldDoneRecipes,
      {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: new Date(),
        tags: strTags.split(','),
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    history.push('/receitas-feitas');
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <p>Algo deu errado, favor tentar novamente!</p>
      </div>
    );
  }

  const { strMeal, strMealThumb, strCategory, strInstructions } = meals[0];

  return (
    <div className="recipe-details">
      <h3 className="recipe-title" data-testid="recipe-title">{ strMeal }</h3>
      <img
        className="recipe-photo"
        src={ strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <br />
      <DetailsButtonsField recipeType="comidas" handleFavorite={ handleFavorite } />
      <p data-testid="recipe-category">{ strCategory }</p>
      <Ingredients max={ maxIngredients } page="inProgress" setDisabled={ setDisabled } />
      <p className="instructions" data-testid="instructions">{ strInstructions }</p>
      <Button
        className="finish-recipe-btn"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleFinish }
        disabled={ disabled }
      >
        Finish recipe
      </Button>
    </div>
  );
};

export default MealInProgress;
