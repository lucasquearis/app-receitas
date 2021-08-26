import React from 'react';
import { arrayOf, string, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';

const num = 12;

function FoodRecipeCards({ recipes, push }) {
  const firstTwelve = recipes.filter((_recipe, index) => index < num);

  return (
    <>
      {recipes.length === 1
        ? push(`/comidas/${recipes[0].idMeal}`)
        : ''}

      {firstTwelve.map((recipe, index) => (
        <RecipeCard
          key={ index }
          name={ recipe.strMeal }
          src={ recipe.strMealThumb }
          index={ index }
          alt={ `${recipe.strMeal} image` }
        />
      ))}
    </>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
});

FoodRecipeCards.propTypes = {
  recipes: arrayOf(shape(string)).isRequired,
  push: func.isRequired,
};

export default connect(mapStateToProps)(FoodRecipeCards);
