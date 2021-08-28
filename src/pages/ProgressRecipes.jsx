import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ingredientsDetails from '../helpers/getIngredients';
import RecipeDetailCard from '../components/RecipeDetailCard';
import useProgressRecipes from '../hooks/useProgressRecipes';
import useLocalStorageRecipes from '../hooks/useLocalStorageRecipes';
import '../styles/progressRecipes.css';
import { saveInProgressRecipes, saveOnLocalStorage } from '../helpers/saveOnLocalStorage';

export default function ProgressRecipes() {
  const location = useLocation();
  const currentPage = location.pathname;
  const { loading, recipes, data } = useProgressRecipes();
  const { inProgressRecipes } = useLocalStorageRecipes();
  const [checkedIngredients, setCheckedIngredients] = useState();

  function valueIngredients({ target }) {
    if (currentPage.includes('comidas')) {
      const savedata = ((saveInProgressRecipes(target.id, recipes)));
      setCheckedIngredients(savedata);
      saveOnLocalStorage('inProgressRecipes', savedata);
    }
    const savedata = ((saveInProgressRecipes(target.id, recipes)));
    setCheckedIngredients(savedata);
    saveOnLocalStorage('inProgressRecipes', savedata);
  }
  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <RecipeDetailCard
          data={ recipes }
          id={ data.recipeId }
          key={ data.recipeId }
          img={ data.image }
          title={ data.title }
          category={ data.alcoholic }
          ingredients={
            data.recipeId ? ingredientsDetails(recipes).map((item, index) => (
              <div key={ index } className="recipes-checkbox">
                <label data-testid={ `${index}-ingredient-step` } htmlFor={ item }>
                  <input
                    id={ item }
                    type="checkbox"
                    key={ index }
                    onClick={ (e) => valueIngredients(e) }
                    defaultChecked={
                      inProgressRecipes === []
                        ? null
                        : inProgressRecipes.includes(item)
                    }
                  />

                  <span>{ item }</span>
                </label>
              </div>
            )) : []
          }
          instructions={ data.instructions }
          showRecomendations={ false }
        />
      )}
    </div>
  );
}
