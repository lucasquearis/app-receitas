import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';

import { useDataContext } from '../../context/DataProvider';
import { getDetails } from '../../services';

import CopyButton from '../../components/CopyButton';
import FavoriteButton from '../../components/FavoriteButton';
import ListDetails from './ListDetails';
import RecipesRecommendation from './RecipesRecommendation';

import './detailsPage.css';
import { getSavedAssistent } from '../../utils';

export default function DetailsPage() {
  const savedIngredients = getSavedAssistent(
    'inProgressRecipes',
    { cocktails: {}, meals: {} },
  );
  const savedDones = getSavedAssistent('doneRecipes');
  const { pathname } = useLocation();

  const history = useHistory();

  // id recebido pela url;
  const { id } = useParams();
  const { setLoading, loading } = useDataContext();

  // estado que salva detalhes da receita;
  const [recipeDetails, setRecipeDetails] = useState({});

  const type = pathname.includes('/comidas/') ? 'food' : 'drinks';

  // define o caminho para a pagina de receitas em andamento de acorodo com o path atual;
  const path = pathname.includes('/comidas/') ? '/comidas' : '/bebidas';

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

  const allIdsInProgress = useMemo(() => ({
    ...savedIngredients.meals, ...savedIngredients.cocktails,
  }), [savedIngredients.cocktails, savedIngredients.meals]);

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
        <img
          src={ recipeDetails.strDrinkThumb || recipeDetails.strMealThumb }
          data-testid="recipe-photo"
          alt={ recipeDetails.strDrink }
          className="main-image"
        />
        <div className="details-container">
          <div className="details-title-container">
            <h1 data-testid="recipe-title">
              { recipeDetails.strDrink || recipeDetails.strMeal }
            </h1>
            <div>
              <CopyButton path={ pathname } />
              <FavoriteButton recipeDetails={ recipeDetails } path={ pathname } />
            </div>
          </div>
          <hr />
          <h2>Ingredients</h2>
          <ul className="details-info-container">
            <ListDetails
              ingredients={ ingredients }
              measures={ measures }
            />
          </ul>
          <hr />
          <h2>
            { 'Category: ' }
            <span data-testid="recipe-category">
              { recipeDetails.strAlcoholic || recipeDetails.strCategory }
            </span>
          </h2>
          <hr />
          <h2>Instructions</h2>
          <p
            data-testid="instructions"
            className="details-info-container"
          >
            { recipeDetails.strInstructions }
          </p>
          { recipeDetails.strDrink && <p>{ `Cup: ${recipeDetails.strGlass}` }</p> }
          { type === 'food' && (
            <ReactPlayer
              url={ recipeDetails.strYoutube }
              controls
              width="100%"
              height="200px"
              data-testid="video"
            />
          ) }
          <hr />
          <RecipesRecommendation type={ type } />
          { !savedDones.some(({ id: savedId }) => savedId === id) && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ () => history.push(`${path}/${id}/in-progress`) }
            >
              { allIdsInProgress[id]
                ? 'Continuar Receita' : 'Iniciar Receita'}
            </button>
          ) }
        </div>
      </>
    );
  };

  return (
    <div style={ { paddingBottom: '20px' } }>
      { !loading ? details() : <h1>Carregando...</h1> }
    </div>
  );
}
