import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { RecipeDetails, Recomendations,
  StartRecipeBtn, ContinueRecipeBtn } from '../components';
import { getIngredients, getMeasures, checkDoneRecipes } from '../helpers';
import { checkDrinksInProgressRecipes } from '../helpers/checkInProgressRecipes';
// import './css/DrinksDetails.css';

const DrinksDetails = () => {
  const [drink, setDrink] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [hide, setHide] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getDrinkByIdAPI = async () => {
      try {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { drinks } = await fetch(URL).then((response) => response.json());
        setDrink({ ...drinks[0] });
      } catch (error) {
        console.log(error);
      }
    };

    const getMealsRecomendationsAPI = async () => {
      try {
        const limit = 6;
        const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const { meals } = await fetch(URL).then((response) => response.json());
        setRecomendations(meals.filter((meal, index) => index < limit));
      } catch (error) {
        console.log(error);
      }
    };

    getDrinkByIdAPI();
    getMealsRecomendationsAPI();
    setHide(checkDoneRecipes(id));
    setInProgress(checkDrinksInProgressRecipes(id));
  }, [id]);

  useEffect(() => {
    setIngredients(getIngredients(drink));
    setMeasures(getMeasures(drink));
  }, [drink]);

  const renderButton = () => {
    if (!hide && inProgress) {
      return (<ContinueRecipeBtn pathname={ location.pathname } />);
    }
    if (!hide) {
      return (<StartRecipeBtn pathname={ location.pathname } />);
    }
    return null;
  };

  return (
    <section className="details">
      <RecipeDetails
        thumbnail={ drink.strDrinkThumb }
        title={ drink.strDrink }
        isAlcoholic={ drink.strAlcoholic }
        instructions={ drink.strInstructions }
        ingredients={ ingredients }
        measures={ measures }
        recipe={ drink }
        id={ drink.idDrink }
      />
      <Recomendations
        recomendations={ recomendations }
        isMeal
      />
      { renderButton() }
    </section>
  );
};

export default DrinksDetails;
