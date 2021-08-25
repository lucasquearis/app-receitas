import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { getDrink } from '../../services/drinkAPI';
import { getMealsForRecommendation } from '../../services/foodAPI';
import { doesItExist } from '../../utils';
import {
  // DRINK_ERROR_RESPONSE,
  NEW_DRINK_SEARCH,
  DRINK_RESPONSE } from '../../redux/reducers/drinkReducer';
import Ingredients from '../Ingredients';
import Recommendations from '../Recommendations';
import StartRecipe from '../StartRecipe';
import DetailsButtonsField from '../DetailsButtonsField';
import Loading from '../Loading';
import './style.css';

const copy = require('clipboard-copy');

const maxIngredients = 15;

const DrinkDetails = () => {
  const loading = useSelector(({ drink }) => drink.loading);
  const drinks = useSelector(({ drink }) => drink.drinks);
  const error = useSelector(({ drink }) => drink.error);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [display, setDisplay] = useState({});
  const [shared, setShared] = useState(false);
  const history = useHistory();
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes && doneRecipes.some((recipe) => recipe.id === id)) {
      setDisplay({ display: 'none' });
    }
    const fetchMeals = async () => {
      const response = await getMealsForRecommendation();
      setRecommendations(response);
    };
    const fetchDrink = async () => {
      // try {
      dispatch({ type: NEW_DRINK_SEARCH });
      const getIngredients = [];
      const response = await getDrink(id, 'id');
      for (let index = 1; index <= maxIngredients; index += 1) {
        const name = response[0][`strIngredient${index}`];
        const measure = response[0][`strMeasure${index}`];
        if (name) {
          const ingredient = {
            name,
            measure,
          };
          getIngredients.push(ingredient);
        }
      }
      await setIngredients(getIngredients);
      await fetchMeals();
      dispatch({ type: DRINK_RESPONSE, payload: response });
      // } catch (error) {
      //   console.log(error);
      //   dispatch({ type: DRINK_ERROR_RESPONSE });
      // }
    };
    fetchDrink();
  }, [id, dispatch]);

  const handleStartRecipe = () => {
    history.push(`/bebidas/${id}/in-progress`);
  };

  const handleShare = () => {
    copy(`http://localhost:3000/bebidas/${id}`);
    setShared(true);
  };

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
      <DetailsButtonsField
        handleShare={ handleShare }
        handleFavorite={ handleFavorite }
        shared={ shared }
        recipeId={ id }
      />
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <Ingredients ingredients={ ingredients } />
      <p className="instructions" data-testid="instructions">{ strInstructions }</p>
      <Recommendations recommendations={ recommendations } />
      <StartRecipe
        inProgressRecipes={ inProgressRecipes }
        recipeType="cocktails"
        handleStartRecipe={ handleStartRecipe }
        display={ display }
        detailsId={ id }
      />
    </div>
  );
};

export default DrinkDetails;
