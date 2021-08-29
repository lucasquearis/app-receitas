import React, { useState, useContext, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import myContext from '../context/myContext';

export default function ButtonFinish() {
  const { lists, objRecipeProgress } = useContext(myContext);
  const [renderCheckbox, setRenderCheckbox] = useState({});
  const [activeButtoFinish, setActiveButtoFinish] = useState(true);
  const { id } = useParams();
  const { pathname } = useLocation();
  const text = pathname.includes('comidas') ? 'meals' : 'cocktails';
  const sizeList = lists.ingredients.length;

  useEffect(() => {
    const { meals } = objRecipeProgress;
    const { cocktails } = objRecipeProgress;
    const keysMeals = Object.keys(meals).includes(id);
    const keysCocktails = Object.keys(cocktails).includes(id);
    if (keysMeals) setRenderCheckbox(objRecipeProgress[text][id]);
    if (keysCocktails) setRenderCheckbox(objRecipeProgress[text][id]);
  }, [objRecipeProgress]);

  const handleChange = () => setActiveButtoFinish(false);

  useEffect(() => {
    if (renderCheckbox && sizeList) {
      const valueTrue = Object.values(renderCheckbox).filter((i) => i === true).length;
      if (valueTrue === sizeList) handleChange();
    }
  }, [activeButtoFinish, renderCheckbox]);

  useEffect(() => console.log(activeButtoFinish));
  return (
    <Link to="/receitas-feitas">
      <button
        type="button"
        className="btn-finish"
        data-testid="finish-recipe-btn"
        disabled={ activeButtoFinish }
      >
        Finalizar Receita
      </button>
    </Link>
  );
}
