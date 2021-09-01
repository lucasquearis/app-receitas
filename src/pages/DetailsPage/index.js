import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';

import { useDataContext } from '../../context/DataProvider';
import { getDetails } from '../../services';

import CopyButton from '../../components/CopyButton';
import FavoriteButton from '../../components/FavoriteButton';
import ListDetails from './ListDetails';
import RecipesRecommendation from './RecipesRecommendation';

import { getSavedAssistent } from '../../utils';

export default function DetailsPage() {
  const savedDones = getSavedAssistent('doneRecipes');
  const { pathname } = useLocation();

  // id recebido pela url;
  const { id } = useParams();
  const { setLoading, loading } = useDataContext();

  // estado que salva detalhes da receita;
  const [recipeDetails, setRecipeDetails] = useState({});

  const type = pathname.includes('/comidas/') ? 'food' : 'drinks';

  // Quando o componente for montado irá executar a função "getItem";
  useEffect(() => {
    const getItem = async (itemType, itemID) => {
      setLoading(true);
      const item = await getDetails(itemType, itemID);
      setLoading(false);
      const [details] = item.meals || item.drinks;
      // Salva os detalhes recebidos pela API no estado;
      setRecipeDetails(details);
    };
    getItem(type, id);
  }, [id, setRecipeDetails, setLoading, type]);

  // Função que criará a "corpo" da página com detalhes;
  const details = () => {
    const itemKeys = Object.keys(recipeDetails);

    // Cria um array a partir dos ingredientes disponíveis;
    const ingredients = itemKeys
      .filter((key) => key.includes('strIngredient') && recipeDetails[key])
      .map((key) => recipeDetails[key]);

    // Cria um array a partir das medidas disponíveis;
    const measures = itemKeys
      .filter((key) => key.includes('strMeasure') && recipeDetails[key])
      .map((key) => recipeDetails[key]);

    return (
      <>
        <CopyButton path={ pathname } />
        <FavoriteButton recipeDetails={ recipeDetails } path={ pathname } />
        <img
          src={ recipeDetails.strDrinkThumb || recipeDetails.strMealThumb }
          data-testid="recipe-photo"
          alt={ recipeDetails.strDrink }
        />
        <p data-testid="recipe-title">
          { recipeDetails.strDrink || recipeDetails.strMeal }
        </p>
        <p data-testid="recipe-category">
          { recipeDetails.strAlcoholic || recipeDetails.strCategory }
        </p>
        <h2>Ingredients</h2>
        <ul>
          <ListDetails
            ingredients={ ingredients }
            measures={ measures }
          />
        </ul>
        <h2>Instructions</h2>
        <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
        { recipeDetails.strDrink && <p>{ `Cup: ${recipeDetails.strGlass}` }</p> }
        { type === 'food' && (
          <ReactPlayer
            url={ recipeDetails.strYoutube }
            controls
            data-testid="video"
          />
        ) }
        <RecipesRecommendation type={ type } />
        { !savedDones.some(({ id: savedId }) => savedId === id) && (
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </button>
        ) }
      </>
    );
  };

  return (
    <div>
      { !loading ? details() : <h1>Carregando...</h1> }
    </div>
  );
}
