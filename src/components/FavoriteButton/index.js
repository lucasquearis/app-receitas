import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { saveAssistent, getSavedAssistent } from '../../utils';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteButton({ recipeDetails, path }) {
  const gettingFavorites = getSavedAssistent('favoriteRecipes');

  const [savedFavorites, setSavedFavorites] = useState(gettingFavorites);

  const [saved, setSaved] = useState(false);

  const id = useMemo(() => (recipeDetails.idMeal || recipeDetails.idDrink),
    [recipeDetails.idDrink, recipeDetails.idMeal]);

  useEffect(() => {
    const isSaved = savedFavorites.some(({ id: savedId }) => savedId === id);
    setSaved(isSaved);
  }, [id, recipeDetails.idDrink, recipeDetails.idMeal, savedFavorites]);

  useEffect(() => {
    saveAssistent('favoriteRecipes', savedFavorites);
  }, [savedFavorites]);

  const handleToggleFavRecipe = () => {
    if (!saved) {
      const type = path.includes('/comidas') ? 'comida' : 'bebida';
      const area = !recipeDetails.strArea ? '' : recipeDetails.strArea;
      const category = !recipeDetails.strCategory ? '' : recipeDetails.strCategory;
      const alcoholicOrNot = !recipeDetails.strAlcoholic
        ? '' : recipeDetails.strAlcoholic;
      const name = recipeDetails.strMeal || recipeDetails.strDrink;
      const image = recipeDetails.strMealThumb || recipeDetails.strDrinkThumb;

      setSavedFavorites([
        ...savedFavorites,
        { id, type, area, category, alcoholicOrNot, name, image },
      ]);
    } else {
      setSavedFavorites(savedFavorites.filter(({ id: savedId }) => savedId !== id));
    }
  };

  const imageSource = useMemo(() => (saved ? blackHeartIcon : whiteHeartIcon), [saved]);

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleToggleFavRecipe }
        src={ imageSource }
      >
        <img src={ imageSource } alt="Botão de favorito" />
      </button>
    </div>
  );
}

FavoriteButton.defaultProps = {
  recipeDetails: {},
};

FavoriteButton.propTypes = {
  recipeDetails: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  path: PropTypes.string.isRequired,
};
