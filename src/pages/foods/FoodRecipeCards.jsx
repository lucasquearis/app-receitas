import React from 'react';
import { arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';

const TWELVE = 12;

function FoodRecipeCards({ recipes }) {
  return (
    <section className="main-recipes">
      {recipes.reduce((acc, recipe, index) => {
        if (index < TWELVE) {
          acc = [...acc, <RecipeCard
            foodPage
            id={ recipe.idMeal }
            key={ index }
            name={ recipe.strMeal }
            src={ recipe.strMealThumb }
            index={ index }
            alt={ `${recipe.strMeal} image` }
          />];
        }
        return acc;
      }, [])}
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
});

FoodRecipeCards.propTypes = {
  recipes: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(FoodRecipeCards);
