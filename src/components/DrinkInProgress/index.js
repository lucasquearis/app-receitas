import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { Button } from 'react-bootstrap';
import { getDrink } from '../../services/drinkAPI';
import { getLocalStorage } from '../../utils';
import {
  NEW_DRINK_SEARCH,
  DRINK_RESPONSE } from '../../redux/reducers/drinkReducer';
import Ingredients from '../Ingredients';
import DetailsButtonsField from '../DetailsButtonsField';
import Loading from '../Loading';
import './style.css';

const DrinkInProgress = () => {
  const history = useHistory();
  const loading = useSelector(({ drink }) => drink.loading);
  const drinks = useSelector(({ drink }) => drink.drinks);
  const error = useSelector(({ drink }) => drink.error);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [disabled, setDisabled] = useState(true);
  const MAX_INGREDIENTS = 15;

  useEffect(() => {
    const fetchDrink = async () => {
      dispatch({ type: NEW_DRINK_SEARCH });
      const response = await getDrink(id, 'id');
      dispatch({ type: DRINK_RESPONSE, payload: response });
    };
    fetchDrink();
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
    strDrink,
    strDrinkThumb,
    strAlcoholic,
    strInstructions,
    idDrink,
    strCategory } = drinks[0];

  const createNewLocalStorageFavorite = (favorites) => [
    ...favorites,
    {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    },
  ];

  const handleFavorite = () => {
    const oldFavorites = getLocalStorage('favoriteRecipes');
    if (!oldFavorites.some((recipe) => recipe.id === idDrink)) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(createNewLocalStorageFavorite(oldFavorites)),
      );
    } else {
      const newFavorites = oldFavorites.filter((recipe) => recipe.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };

  const removeFromInProgressLocalStorage = () => {
    const recipeInProgress = getLocalStorage('inProgressRecipes');
    if (recipeInProgress.cocktails[idDrink]) delete recipeInProgress.cocktails[idDrink];
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
  };

  const addToDoneLocalStorage = () => {
    const oldDoneRecipes = getLocalStorage('doneRecipes');
    const today = new Date();
    const newDoneRecipes = [
      ...oldDoneRecipes,
      {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
        tags: [],
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
      <h3 className="recipe-title" data-testid="recipe-title">{ strDrink }</h3>
      <img
        className="recipe-photo"
        src={ strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <br />
      <DetailsButtonsField recipeType="bebidas" handleFavorite={ handleFavorite } />
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <Ingredients
        max={ MAX_INGREDIENTS }
        page="inProgress"
        setDisabled={ setDisabled }
      />
      <p className="instructions" data-testid="instructions">{ strInstructions }</p>
      <Button
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

export default DrinkInProgress;
