import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { RecipeDetails, Recomendations,
  StartRecipeBtn, ContinueRecipeBtn } from '../components';
import { checkDoneRecipes, getIngredients, getMeasures } from '../helpers';
import { checkMealsInProgressRecipes } from '../helpers/checkInProgressRecipes';
import './css/MealsDetails.css';

const MealsDetails = () => {
  const [meal, setMeal] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [hide, setHide] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getMealByIdAPI = async () => {
      try {
        const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { meals } = await fetch(URL).then((response) => response.json());
        setMeal({ ...meals[0] });
      } catch (error) {
        console.log(error);
      }
    };

    const getDrinksRecomendations = async () => {
      try {
        const limit = 6;
        const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const { drinks } = await fetch(URL).then((response) => response.json());
        setRecomendations(drinks.filter((drink, index) => index < limit));
      } catch (error) {
        console.log(error);
      }
    };
    getMealByIdAPI();
    getDrinksRecomendations();
    setInProgress(checkMealsInProgressRecipes(id));
    setHide(checkDoneRecipes(id));
  }, [id]);

  useEffect(() => {
    setIngredients(getIngredients(meal));
    setMeasures(getMeasures(meal));
  }, [meal]);

  const fixVideoUrl = () => {
    const url = meal.strYoutube;
    if (url) return url.replace('watch?v=', 'embed/');
  };

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
        thumbnail={ meal.strMealThumb }
        title={ meal.strMeal }
        category={ meal.strCategory }
        instructions={ meal.strInstructions }
        ingredients={ ingredients }
        measures={ measures }
        isMeal
        videoUrl={ fixVideoUrl() }
        recipe={ meal }
      />
      <Recomendations
        recomendations={ recomendations }
        isDrink
      />
      { renderButton() }
    </section>
  );
};

export default MealsDetails;
