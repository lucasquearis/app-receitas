import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import Sugestions from '../components/Sugestions';
import '../styles/Details.css';
import HeaderDetails from '../components/HeaderDetails';
import myContext from '../context/myContext';
import Ingredients from '../components/Ingredients';

function RecipesDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { keyType,
    setRecipe, setKeysType, url, recipe } = useContext(myContext);
  const [buttonText, setButtonText] = useState(false);

  const video = (<iframe
    className="recipe-video"
    data-testid="video"
    title={ recipe.srtMeal }
    width="420"
    height="315"
    src={ url }
  />);

  const handleClick = () => {
    const idRecipe = JSON.parse(localStorage.getItem('idRecipe'));
    localStorage.setItem('idRecipe', JSON.stringify([...idRecipe, id]));
    setButtonText(true);
  };

  useEffect(() => {
    try {
      const urlMeals = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const correctURL = pathname.includes('comidas') ? urlMeals : urlDrinks;
      const type = pathname.includes('comidas') ? 'meals' : 'drinks';
      setKeysType(type);
      const fetchRecipe = async () => {
        const request = await fetch(`${correctURL}${id}`);
        const response = await request.json();
        setRecipe(response[type][0]);
      };

      fetchRecipe();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const messageButton = !buttonText ? 'Iniciar Receita' : 'Continuar Receita';
  const text = keyType === 'meals' ? 'drinks' : 'meals';
  if (buttonText) return <Redirect to={ `${pathname}/in-progress` } />;

  return (
    <section className="details-body">
      <HeaderDetails />
      <Ingredients />
      {
        (keyType === 'meals') && video
      }
      <div className="sugestions">
        <Sugestions type={ text } />
      </div>
      <button
        className="iniciar-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        { messageButton }
      </button>
    </section>
  );
}

export default RecipesDetails;
