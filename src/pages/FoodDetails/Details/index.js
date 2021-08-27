import React from 'react';
import PropTypes from 'prop-types';
import { useDetailsContext } from '../../../context/DetailsProvider';
import ListDetails from './ListDetails';
import VideoPlayer from './VideoPlayer';
import RecipesRecommendation from './RecipesRecommendation';
import CopyButton from '../../../components/CopyButton';
import FavoriteButton from '../../../components/FavoriteButton';

export default function Details({ item, pathname }) {
  const { type, loading } = useDetailsContext();
  const objectFormatter = (object) => {
    const objectAsArray = Object.entries(object);

    const ingredients = objectAsArray
      .filter((ingredient) => ingredient[0]
        .includes('strIngredient') && (ingredient[1] !== '' && ingredient[1] !== null))
      .map((value) => ({ ingredient: value[1] }));

    const measures = objectAsArray
      .filter((ingredient) => ingredient[0].includes('strMeasure') && ingredient[1])
      .map((value) => ({ measure: value[1] }));

    return (
      <div>
        <img
          src={ object.strDrinkThumb || object.strMealThumb }
          data-testid="recipe-photo"
          alt={ object.strDrink }
        />
        <p data-testid="recipe-title">{object.strDrink || object.strMeal}</p>
        <CopyButton path={ pathname } />
        <FavoriteButton />
        <p data-testid="recipe-category">{object.strAlcoholic || object.strCategory}</p>
        <h2>Ingredients</h2>
        <ul>
          <ListDetails ingredients={ ingredients } measures={ measures } />
        </ul>
        <h2>Instructions</h2>
        <p data-testid="instructions">{object.strInstructions}</p>
        {object.strDrink && (
          <p>
            Cup:
            { object.strGlass }
          </p>)}
        {type === 'food' && <VideoPlayer strYoutube={ object.strYoutube } />}
        <RecipesRecommendation />
      </div>
    );
  };

  const chooseObjectType = () => {
    if (type === 'food' && item.meals) {
      return objectFormatter(...item.meals);
    }
    if (type === 'drinks' && item.drinks) {
      return objectFormatter(...item.drinks);
    }
  };

  return (
    <div>
      { loading ? <p>Carregando...</p> : chooseObjectType()}
    </div>
  );
}

Details.propTypes = {
  item: PropTypes.shape({
    meals: PropTypes.shape({

    }),
    drinks: PropTypes.shape({

    }),
  }),
}.isRequired;
