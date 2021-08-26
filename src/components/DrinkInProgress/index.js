import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';
import { Button } from 'react-bootstrap';
import { getDrink } from '../../services/drinkAPI';
import { doesItExist } from '../../utils';
import {
  // DRINK_ERROR_RESPONSE,
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
  const location = useLocation();
  const [disabled, setDisabled] = useState(true);
  const maxIngredients = 15;

  useEffect(() => {
    const fetchDrink = async () => {
      // try {
      dispatch({ type: NEW_DRINK_SEARCH });
      const response = await getDrink(id, 'id');
      dispatch({ type: DRINK_RESPONSE, payload: response });
      // } catch (error) {
      //   console.log(error);
      //   dispatch({ type: DRINK_ERROR_RESPONSE });
      // }
    };
    fetchDrink();
  }, [id, dispatch, location]);

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic } = drinks[0];
    const oldFavorites = doesItExist(favoriteRecipes);
    if (!oldFavorites.some((recipe) => recipe.id === idDrink)) {
      const newFavorites = [
        ...oldFavorites,
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
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const newFavorites = oldFavorites.filter((recipe) => recipe.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };

  const handleFinish = () => {
    const { idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic } = drinks[0];
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const oldDoneRecipes = doesItExist(doneRecipes);
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
        doneDate: new Date(),
        tags: [],
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

  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions } = drinks[0];

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
      <Ingredients max={ maxIngredients } page="inProgress" setDisabled={ setDisabled } />
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
