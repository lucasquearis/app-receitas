import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function favoriteRecipes(addOrRemove, setAddOrRemove, recipe, pathname) {
  let favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (!addOrRemove) {
    favoriteRecipesStorage.push({
      id: recipe.idMeal || recipe.idDrink,
      type: pathname.includes('comidas') ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    });
  } else {
    favoriteRecipesStorage = favoriteRecipesStorage
      .filter((recipeArr) => recipeArr.id !== (recipe.idMeal || recipe.idDrink));
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesStorage));
  setAddOrRemove(!addOrRemove);
}

function ShareAndFavBtn({ recipe }) {
  const { pathname } = useLocation();
  const [addOrRemoveFav, setAddOrRemoveFav] = useState();
  const [copyOk, setCopyOk] = useState(false);

  useEffect(() => {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'))
    || [];
    setAddOrRemoveFav(favoriteRecipesStorage
      .some((recipeArr) => recipeArr.id === (recipe.idMeal || recipe.idDrink)));
  }, [recipe]);
  return (
    <section>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          navigator.clipboard.writeText(window.location.href);
          setCopyOk(true);
        } }
      >
        Share
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ () => favoriteRecipes(
          addOrRemoveFav, setAddOrRemoveFav, recipe, pathname,
        ) }
        src={ addOrRemoveFav
          ? '../images/blackHeartIcon.svg' : '../images/whiteHeartIcon.svg' }
      >
        Favorite
      </button>
      { copyOk ? <p>Link copiado!</p> : null}
    </section>
  );
}

ShareAndFavBtn.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
};

export default ShareAndFavBtn;
