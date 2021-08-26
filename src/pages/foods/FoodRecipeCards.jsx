import React from 'react';
import { Redirect } from 'react-router-dom';
import { arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';

const num = 12;

function FoodRecipeCards({ recipes }) {
  const firstTwelve = recipes.filter((_recipe, index) => index < num);

  return (
    <>
      {recipes.length === 1
        ? <Redirect to={ `/comidas/${recipes[0].idMeal}` } />
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
  recipes: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(FoodRecipeCards);
