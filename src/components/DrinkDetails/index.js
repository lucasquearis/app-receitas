import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getDrink } from '../../services/drinkAPI';
import { getMealsForRecommendation } from '../../services/foodAPI';
import { getLocalStorage, createIngredients } from '../../utils';
import { NEW_DRINK_SEARCH, DRINK_RESPONSE } from '../../redux/reducers/drinkReducer';
import Ingredients from '../Ingredients';
import Recommendations from '../Recommendations';
import StartRecipe from '../StartRecipe';
import DetailsButtonsField from '../DetailsButtonsField';
import Loading from '../Loading';
import './style.css';

const DrinkDetails = () => {
  const loading = useSelector(({ drink }) => drink.loading);
  const drinks = useSelector(({ drink }) => drink.drinks);
  const error = useSelector(({ drink }) => drink.error);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const MAX_INGREDIENTS = 15;

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await getMealsForRecommendation();
      setRecommendations(response);
    };
    const fetchDrink = async () => {
      dispatch({ type: NEW_DRINK_SEARCH });
      const response = await getDrink(id, 'id');
      const recipeIngredients = createIngredients(response, MAX_INGREDIENTS);
      await setIngredients(recipeIngredients);
      await fetchMeals();
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
      <Ingredients max={ MAX_INGREDIENTS } page="details" />
      <p className="instructions" data-testid="instructions">{ strInstructions }</p>
      <Recommendations recommendations={ recommendations } />
      <StartRecipe recipeType="cocktails" ingredients={ ingredients } />
    </div>
  );
};

export default DrinkDetails;
