import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doneRecipe } from '../redux/actions/doneRecipesActions';
import { removeCocktail, removeMeal } from '../redux/actions/inProgressRecipesActions';

function UseFinishRecipe(recipe, type) {
  const [redirect, setRedirect] = useState(false);
  const ptType = type === 'Meal' ? 'comida' : 'bebida';
  const date = new Date();
  const tags = recipe.strTags ? recipe.strTags.split(',') : [];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const finalDate = new Date(year, month, day);
  const doneDate = finalDate.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  console.log(day);
  console.log(doneDate);

  const dispatch = useDispatch();
  const finishedRecipe = {
    id: recipe[`id${type}`],
    type: ptType,
    area: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe[`str${type}`],
    image: recipe[`str${type}Thumb`],
    doneDate,
    tags,
  };

  const finishRecipe = () => {
    dispatch(doneRecipe(finishedRecipe));
    if (type === 'Meal') {
      dispatch(removeMeal(recipe[`id${type}`]));
    } else {
      dispatch(removeCocktail(recipe[`id${type}`]));
    }
    setRedirect(true);
  };

  return { redirect, finishRecipe };
}

export default UseFinishRecipe;
