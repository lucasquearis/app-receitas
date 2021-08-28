import React, { useState, useEffect } from 'react';
import '../cssPages/IngredientsList.css';

function IngredientsList(params) {
  console.log(params);
  const { id: recipeId, type, listRenderType, recipe } = params.data;
  const sector = (type === 'comidas') ? 'meals' : 'cocktails';
  const [recipeIngs, setRecipeIngs] = useState([]);

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
        checked={ ingOnArray && 'checked' }
        id={ `ingredient-${ingNum}` }
        onChange={ () => handleCheckBoxClick(ingNum, ingOnArray) }
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
    const arrayList = Object.keys(recipe).filter((key) => key.includes('strIngredient')
      && recipe[key] !== null && recipe[key] !== '');
    const testIdText = listRenderType ? '-ingredient-name-and-measure'
      : '-ingredient-step';
    return (
      <ul>
        {
          arrayList.map((ing, index) => {
            const ingNum = ing.match(/\d/g).join('');
            const ingOnArray = (recipeIngs.indexOf(ingNum) >= 0);
            const text = `${recipe[ing]}: ${recipe[`strMeasure${ingNum}`]}`;
            return (
              <li
                key={ index }
                data-testid={ `${index}${testIdText}` }
              >
                {(listRenderType) ? checkBoxComponent(text, ingNum, ingOnArray) : text }
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
