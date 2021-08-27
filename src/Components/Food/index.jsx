import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../RecipeCard';

const doze = 12;
const Food = ({ recipes, maxRecipes = doze }) => {
  if (recipes === undefined) {
    return <div>loding</div>;
  }

  return (
    <>
      {recipes.slice(0, maxRecipes).map((recipe, index) => (
        <RecipeCard
          feedType={ recipe.idMeal ? 'comidas' : 'bebidas' }
          key={ index }
          name={ recipe.strMeal || recipe.strDrink }
          image={ recipe.strMealThumb || recipe.strDrinkThumb }
          testId={ maxRecipes === doze
            ? `${index}-recipe-card` : `${index}-recomendation-card` }
          index={ index }
          id={ recipe.idMeal || recipe.idDrink }
        />
      ))}
    </>
  );
};

Food.propTypes = {
  recipes: PropTypes.objectOf(PropTypes.object).isRequired,
  maxRecipes: PropTypes.number.isRequired,
};
export default Food;
