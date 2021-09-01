import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { Button } from 'react-bootstrap';
import { getFood } from '../../services/foodAPI';
import { getLocalStorage } from '../../utils';
import {
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
  const [disabled, setDisabled] = useState(true);
  const MAX_INGREDIENTS = 20;

  useEffect(() => {
    const fetchFood = async () => {
      dispatch({ type: NEW_FOOD_SEARCH });
      const response = await getFood(id, 'id');
      dispatch({ type: FOOD_RESPONSE, payload: response });
    };
    fetchFood();
  }, [id, dispatch]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <p>Algo deu errado, favor tentar novamente!</p>
      </div>
    );
  }

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    idMeal,
    strArea,
    strTags } = meals[0];

  const createNewLocalStorageFavorite = (favorites) => [
    ...favorites,
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

  const handleFavorite = () => {
    const oldFavorites = getLocalStorage('favoriteRecipes');
    if (!oldFavorites.some((recipe) => recipe.id === idMeal)) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(createNewLocalStorageFavorite(oldFavorites)),
      );
    } else {
      const newFavorites = oldFavorites.filter((recipe) => recipe.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };

  const removeFromInProgressLocalStorage = () => {
    const getInprogress = getLocalStorage('inProgressRecipes');
    if (getInprogress.meals[idMeal]) delete getInprogress.meals[idMeal];
    localStorage.setItem('inProgressRecipes', JSON.stringify(getInprogress));
  };

  const addToDoneLocalStorage = () => {
    const oldDoneRecipes = getLocalStorage('doneRecipes');
    const today = new Date();
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
        doneDate: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
        tags: strTags.split(','),
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
  };

  const handleFinish = () => {
    removeFromInProgressLocalStorage();
    addToDoneLocalStorage();
    history.push('/receitas-feitas');
  };

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
      <Ingredients
        max={ MAX_INGREDIENTS }
        page="inProgress"
        setDisabled={ setDisabled }
      />
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
