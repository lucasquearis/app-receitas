import React, { useEffect, useState } from 'react';
import { string, shape } from 'prop-types';
import useLocalStorage from '../helpers/useLocalStorage';

function IngredientsCheckList(props) {
  const { recipe, enType, id } = props;
  const [recipes, setRecipes] = useState([]);
  const [recipesStg, setRecipesStg] = useLocalStorage('inProgressRecipes', {});
  const recipeOne = recipe[enType][0];
  const lineThrough = 'line-through';

  useEffect(() => {
    if (!recipesStg) {
      setRecipesStg({
        meals: '',
        cocktails: '',
      });
    }
    if (recipesStg.meals) {
      setRecipes(recipesStg.meals[id]);
    }
    if (recipesStg.cocktails) {
      setRecipes(recipesStg.cocktails[id]);
    }
  }, []);

  useEffect(() => {
    if (enType === 'meals' && recipes) {
      setRecipesStg({ meals: { [id]: recipes } });
    }
    if (enType === 'drinks' && recipes) {
      setRecipesStg({ cocktails: { [id]: recipes } });
    }
  }, [recipes]);

  const onClick = ({ e, ingredient }) => {
    const { target } = e;
    if (target.parentElement.style.textDecoration === lineThrough) {
      target.parentElement.style.textDecoration = 'none';
      const filteredArray = recipes.filter((name) => name !== ingredient);
      setRecipes(filteredArray);
    } else {
      target.parentElement.style.textDecoration = lineThrough;
      if (recipes) {
        return setRecipes([...recipes, ingredient]);
      }
      return setRecipes([ingredient]);
    }
  };

  const isChecked = (ingredient) => {
    if (recipes && recipes.includes(ingredient)) {
      return true;
    }
    return false;
  };

  const isIncluded = (ingredient) => {
    if (isChecked(ingredient)) {
      return { textDecoration: 'line-through' };
    }
    return { textDecoration: 'none' };
  };

  const renderList = () => {
    const ingredientList = [];
    const measureList = [];
    const maxIngredients = 15;
    if (recipeOne) {
      for (let index = 0; index < maxIngredients; index += 1) {
        if (recipeOne[`strIngredient${index + 1}`]) {
          ingredientList.push(recipeOne[`strIngredient${index + 1}`]);
          measureList.push(recipeOne[`strMeasure${index + 1}`]);
        }
      }
    }

    return (
      ingredientList.map((ingredient, index) => (
        <label
          style={ isIncluded(ingredient) }
          htmlFor={ index }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            id={ index }
            type="checkbox"
            defaultChecked={ isChecked(ingredient) }
            key={ index }
            onClick={ (e) => onClick({
              e,
              ingredient,
            }) }
          />
          { `${ingredient}: ${measureList[index]}` }
        </label>
      ))
    );
  };
  return (
    renderList()
  );
}

IngredientsCheckList.propTypes = {
  recipe: shape({}),
  enType: string,
}.isRequired;

export default IngredientsCheckList;
