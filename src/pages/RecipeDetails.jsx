import React, { useContext, useEffect } from 'react';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import myContext from '../context/myContext';
import HeaderDetails from '../components/HeaderDetails';
import Ingredients from '../components/Ingredients';
import Sugestions from '../components/Sugestions';

function RecipesDetails(props) {
  const { history } = props;
  const { pathname } = useLocation();
  const { id } = useParams();
  const { keyType,
    setRecipe, setKeysType, url, recipe } = useContext(myContext);

  const video = (<iframe
    className="recipe-video"
    data-testid="video"
    title={ recipe.srtMeal }
    width="300"
    height="250"
    src={ url }
  />);

  useEffect(() => {
    try {
      const urlMeals = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const finalURL = pathname.includes('comidas') ? urlMeals : urlDrinks;
      const type = pathname.includes('comidas') ? 'meals' : 'drinks';
      setKeysType(type);
      console.log(`${finalURL}${id}`);
      const fetchRecipe = async () => {
        const request = await fetch(`${finalURL}${id}`);
        const response = await request.json();
        setRecipe(response[type][0]);
      };

      fetchRecipe();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClickProgress = (e) => {
    e.preventDefault();
    return history.push(`/comidas/${id}/in-progress`);
  };

  const text = keyType === 'meals' ? 'drinks' : 'meals';
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
        onClick={ (e) => handleClickProgress(e) }
        style={ { position: 'fixed', bottom: '0px' } }
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </section>
  );
}

RecipesDetails.propTypes = {
  history: objectOf(oneOfType([func, string, number, object])).isRequired,
};

export default RecipesDetails;
