import React from 'react';
import { arrayOf, string, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';

const num = 12;

function DrinkRecipeCards({ recipes, push }) {
  const firstTwelve = recipes.filter((_recipe, index) => index < num);

  return (
    <>
      {recipes.length === 1
        ? push(`/bebidas/${recipes[0].idDrink}`)
        : ''}

      {firstTwelve.map((recipe, index) => (
        <RecipeCard
          key={ index }
          name={ recipe.strDrink }
          src={ recipe.strDrinkThumb }
          index={ index }
          alt={ `${recipe.strDrink} image` }
        />
      ))}
    </>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
});

DrinkRecipeCards.propTypes = {
  recipes: arrayOf(shape(string)).isRequired,
  push: func.isRequired,
};

export default connect(mapStateToProps)(DrinkRecipeCards);
