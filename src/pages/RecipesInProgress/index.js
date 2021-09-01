import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useDataContext } from '../../context/DataProvider';
import { getDetails } from '../../services';
import CopyButton from '../../components/CopyButton';
import FavoriteButton from '../../components/FavoriteButton';
import CheckList from './CheckList';
import { getSavedAssistent, saveAssistent } from '../../utils';

const savedIngredients = getSavedAssistent(
  'inProgressRecipes',
  { cocktails: {}, meals: {} },
);

export default function RecipesInProgress() {
  const { loading, setLoading } = useDataContext();
  const history = useHistory();
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});

  const [checkedItems, setCheckedItems] = useState(savedIngredients);

  const { pathname } = useLocation();
  const type = pathname.includes('/comidas') ? 'food' : 'drinks';
  const url = type === 'food' ? 'comida' : 'bebida';

  useEffect(() => {
    saveAssistent('inProgressRecipes', checkedItems);
  }, [checkedItems]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getDetails(type, id);
      const [details] = response.meals || response.drinks;
      setRecipeDetails(details);
      setLoading(false);
    })();
  }, [id, setLoading, type]);

  const infos = useMemo(() => {
    const detailKeys = Object.keys(recipeDetails);

    return {
      ingredients: detailKeys
        .filter((key) => key.includes('strIngredient') && recipeDetails[key])
        .map((key) => recipeDetails[key]),

      measures: detailKeys
        .filter((key) => key.includes('strMeasure') && recipeDetails[key])
        .map((key) => recipeDetails[key]),
    };
  }, [recipeDetails]);

  const allChecked = useMemo(() => {
    if (checkedItems.meals[id]) {
      return infos.ingredients.every((ingredient) => (
        checkedItems.meals[id].includes(ingredient)
      ));
    }
    if (checkedItems.cocktails[id]) {
      return infos.ingredients.every((ingredient) => (
        checkedItems.cocktails[id].includes(ingredient)
      ));
    }
    return false;
  }, [checkedItems, id, infos.ingredients]);

  return (
    <div>
      { !loading
        ? (
          <>
            <img
              src={ recipeDetails.strDrinkThumb || recipeDetails.strMealThumb }
              data-testid="recipe-photo"
              alt={ recipeDetails.strDrink }
              // estilo temporário para passar nos requisitos;
              style={ { width: '200px' } }
            />
            <div>
              <CopyButton path={ `/${url}s/${id}` } />
              <FavoriteButton recipeDetails={ recipeDetails } path={ pathname } />
            </div>
            <h1 data-testid="recipe-title">
              { recipeDetails.strDrink || recipeDetails.strMeal }
            </h1>
            <p data-testid="recipe-category">
              { recipeDetails.strCategory }
            </p>
            <h3>Ingredients</h3>
            <ul>
              { infos.ingredients.map((ingredient, index) => (
                <CheckList
                  key={ ingredient }
                  type={ type }
                  ingredient={ ingredient }
                  measures={ infos.measures }
                  checkedItems={ checkedItems }
                  setCheckedItems={ setCheckedItems }
                  id={ id }
                  index={ index }
                />
              )) }
            </ul>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ !allChecked }
              onClick={ () => history.push('/receitas-feitas') }
            >
              Finalizar receita
            </button>
            <h3>Instructions</h3>
            <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
          </>
        ) : <h1>Carregando...</h1> }
    </div>
  );
}
