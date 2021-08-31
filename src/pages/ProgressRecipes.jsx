import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ingredientsDetails from '../helpers/getIngredients';
import RecipeDetailCard from '../components/RecipeDetailCard';
import useProgressRecipes from '../hooks/useProgressRecipes';
import useLocalStorageRecipes from '../hooks/useLocalStorageRecipes';
import '../styles/progressRecipes.css';
import {
  saveInProgressRecipes,
  saveOnLocalStorage,
  saveNewDoneRecipe,
} from '../helpers/saveOnLocalStorage';
import { doneFood, doneDrink } from '../redux/actions/doneRecipesActions';

export default function ProgressRecipes() {
  const location = useLocation();
  const currentPage = location.pathname;
  const { loading, recipes, data } = useProgressRecipes();
  const { inProgressRecipes } = useLocalStorageRecipes();
  const [checkedIngredients, setCheckedIngredients] = useState(0);
  const dispatch = useDispatch();

  function valueIngredients({ target }) {
    if (currentPage.includes('comidas')) {
      const savedata = ((saveInProgressRecipes(target.id, recipes)));
      saveOnLocalStorage('inProgressRecipes', savedata);
    }
    const savedata = ((saveInProgressRecipes(target.id, recipes)));
    saveOnLocalStorage('inProgressRecipes', savedata);
    setCheckedIngredients((prevState) => prevState + 1);
  }

  function handleClick() {
    let type;
    if (currentPage.includes('comidas')) {
      type = 'comidas';
    } else {
      type = 'bebidas';
    }

    const recipe = saveNewDoneRecipe(recipes, type);
    if (currentPage.includes('comidas')) {
      dispatch(doneFood(recipe));
    } else {
      dispatch(doneDrink(recipe));
    }
  }

  const lengthItems = ingredientsDetails(recipes).map((item) => item).length;
  console.log(checkedIngredients);
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
          handleClick={ handleClick }
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
          finalized={ checkedIngredients === lengthItems }
        />
      )}
    </div>
  );
}
