import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../RecipeCard';

const Food = ({ recipes }) => {
  const maxRecipes = 12;
  if (recipes === undefined) {
    return <div>loding</div>;
  }

  return (
    <div>
      {recipes.slice(0, maxRecipes).map((recipe, index) => (
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

Food.propTypes = {
  recipes: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default Food;
