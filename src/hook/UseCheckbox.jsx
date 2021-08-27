import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCocktail, addMeal } from '../redux/actions/inProgressRecipesActions';

function UseCheckbox(recipe, type) {
  let key;
  if (type === 'Meal') {
    key = 'meals';
  } else {
    key = 'cocktails';
  }

  const initial = useSelector((state) => state
    .inProgressRecipes[key][recipe[`id${type}`]]) || [];

  const [checkedOptions, setCheckedOptions] = useState(initial);

  const handleClick = ({ target: { checked, name } }) => {
    if (checked) {
      setCheckedOptions([...checkedOptions, name]);
    } else {
      setCheckedOptions(checkedOptions.filter((ingredient) => ingredient !== name));
    }
  };

  const ingredients = [];
  const measures = [];
  const maxIngredients = 20;

  for (let index = 1; index <= maxIngredients; index += 1) {
    if (recipe[`strIngredient${index}`]) {
      ingredients.push(recipe[`strIngredient${index}`]);
    }
  }

  for (let index = 1; index <= maxIngredients; index += 1) {
    if (recipe[`strMeasure${index}`]) {
      measures.push(recipe[`strMeasure${index}`]);
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const data = { id: recipe[`id${type}`], ingredients: checkedOptions };
    if (type === 'Meal') {
      dispatch(addMeal(data));
    } else {
      dispatch(addCocktail(data));
    }
  }, [checkedOptions, recipe, type, dispatch]);

  return { ingredients, measures, checkedOptions, handleClick };
}

export default UseCheckbox;
