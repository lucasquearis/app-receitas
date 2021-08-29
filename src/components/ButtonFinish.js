import React, { useState, useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import myContext from '../context/myContext';

export default function ButtonFinish() {
  const { lists, objRecipeProgress, setObjRecipeProgress } = useContext(myContext);
  const [renderCheckbox, setRenderCheckbox] = useState({});
  const { id } = useParams();
  const { pathname } = useLocation();
  const text = pathname.includes('comidas') ? 'meals' : 'cocktails';

  useEffect(() => {
    const { meals } = objRecipeProgress;
    const { cocktails } = objRecipeProgress;
    const keysMeals = Object.keys(meals).includes(id);
    const keysCocktails = Object.keys(cocktails).includes(id);
    if (keysMeals) setRenderCheckbox(objRecipeProgress[text][id]);
    if (keysCocktails) setRenderCheckbox(objRecipeProgress[text][id]);
  }, [objRecipeProgress]);

  useEffect(() => {
    if (renderCheckbox) console.log(Object.values(renderCheckbox).length);
  }, [renderCheckbox]);

  if (renderCheckbox) console.log(Object.values(renderCheckbox).length);

  // useEffect(() => console.log(renderCheckbox));
  // useEffect(() => console.log(lists.ingredients.length));

  return (
    <button type="button" data-testid="finish-recipe-btn">
      Finalizar Receita
    </button>
  );
}
