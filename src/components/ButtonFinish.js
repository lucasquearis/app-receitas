import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import myContext from '../context/myContext';

export default function ButtonFinish() {
  const {
    keyType,
    lists,
    recipe,
    objRecipeProgress,
    updateLocalStoreRecipeDone,
    doneRecipe,
    setDoneRecipe,
  } = useContext(myContext);

  const [trueOrFalse, setTrueOrFalse] = useState(false);
  const [activeButton, setActioveButton] = useState(true);
  const { id } = useParams();
  const { pathname } = useLocation();
  const text = pathname.includes('comidas') ? 'meals' : 'cocktails';
  const type = keyType === 'meals' ? 'Meal' : 'Drink';
  const alcolic = keyType === 'meals' ? '' : recipe.Alcoholic;
  const sizeList = lists.ingredients.length;

  const objDoneRecipe = {
    id,
    type: text,
    area: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: alcolic,
    name: recipe[`str${type}`],
    image: recipe[`str${type}Thumb`],
    doneDate: '22/6/2020',
    tags: recipe.strTags,
  };

  useEffect(() => {
    const keysM = Object.keys(objRecipeProgress.meals).includes(id);
    const keysC = Object.keys(objRecipeProgress.cocktails).includes(id);
    if (keysM) setTrueOrFalse(objRecipeProgress[text][id]);
    if (keysC) setTrueOrFalse(objRecipeProgress[text][id]);
  }, [objRecipeProgress]);

  useEffect(() => {
    if (trueOrFalse && (trueOrFalse.filter((i) => i === true).length === sizeList)) {
      setActioveButton(false);
    }
  }, [objRecipeProgress]);

  useEffect(() => {
    setDoneRecipe([...doneRecipe, objDoneRecipe]);
  }, []);

  const handleClick = () => {
    updateLocalStoreRecipeDone();
  };

  return (
    <Link to="/receitas-feitas">
      <button
        type="button"
        className="btn-finish"
        data-testid="finish-recipe-btn"
        disabled={ activeButton }
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>
    </Link>
  );
}
