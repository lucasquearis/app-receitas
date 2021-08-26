import React, { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';
import RecipeCard from '../RecipeCard';

const Food = () => {
  const { meal } = useContext(ContextApp);
  const maxRecipes = 12;
  if (meal === undefined) {
    return <div>loding</div>;
  }

  return (
    <div>
      {meal.slice(0, maxRecipes).map((recipe, index) => (
        <RecipeCard
          key={ index }
          name={ recipe.strMeal || recipe.strDrink }
          image={ recipe.strMealThumb || recipe.strDrinkThumb }
          testId={ `${index}-recipe-card` }
          index={ index }
          props={ recipe }
          id={ recipe.idMeal || recipe.idDrink }
        />
      ))}
    </div>
  );
};

export default Food;
