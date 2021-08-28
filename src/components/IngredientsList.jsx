import React, { useState, useEffect } from 'react';
import '../cssPages/IngredientsList.css';

const sectorTranslator = { comidas: 'meals', bebidas: 'cocktails' };

function IngredientsList(params) {
  const { id: recipeId, type, renderType, recipe, setCompleted } = params.data;
  const sector = sectorTranslator[type];

  const arrayList = Object.keys(recipe).filter((key) => key.includes('strIngredient')
    && recipe[key] !== null && recipe[key] !== '');

  const [recipeIngs, setRecipeIngs] = useState([]);

  useEffect(() => {
    if (recipeIngs.length === arrayList.length) {
      setCompleted(true);
    } else { setCompleted(false); }
  }, [arrayList, recipeIngs, setCompleted]);

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }));
    } else {
      setRecipeIngs((JSON.parse(localStorage
        .getItem('inProgressRecipes')))[sector][recipeId] || []);
    }
  },
  [recipeId, sector]);

  const handleCheckBoxClick = (ingNum, ingOnArray) => {
    const newRecipeIngs = ingOnArray
      ? recipeIngs.filter((ing) => ing !== ingNum) : [...recipeIngs, ingNum].sort();
    setRecipeIngs(newRecipeIngs);
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ ...JSON.parse(localStorage.getItem('inProgressRecipes')),
        [sector]: { [recipeId]: newRecipeIngs } }));
  };

  const checkBoxComponent = (text, ingNum, ingOnArray) => (
    <>
      <input
        type="checkbox"
        defaultChecked={ ingOnArray }
        id={ `ingredient-${ingNum}` }
        onClick={ () => handleCheckBoxClick(ingNum, ingOnArray) }
      />
      <label
        htmlFor={ `ingredient-${ingNum}` }
        className={ ingOnArray && 'checkedIng' }
      >
        { text }
      </label>
    </>
  );

  const list = () => {
    const testIdText = renderType ? '-ingredient-step'
      : '-ingredient-name-and-measure';
    return (
      <ul>
        {
          arrayList.map((ing, index) => {
            const ingNum = ing.match(/\d/g).join('');
            const ingOnArray = (recipeIngs.indexOf(ingNum) >= 0) ? true : null;
            const text = `${recipe[ing]}: ${recipe[`strMeasure${ingNum}`]}`;
            return (
              <li
                key={ index }
                data-testid={ `${index}${testIdText}` }
              >
                {(renderType) ? checkBoxComponent(text, ingNum, ingOnArray) : text }
              </li>
            );
          })
        }
      </ul>
    );
  };

  return (
    <>
      {list()}
    </>
  );
}

export default IngredientsList;
