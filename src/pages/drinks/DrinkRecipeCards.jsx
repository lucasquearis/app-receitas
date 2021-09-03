import React from 'react';
import { arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';

const TWELVE = 12;

function DrinkRecipeCards({ recipes }) {
  return (
    <section className="main-recipes">
      {recipes.reduce((acc, recipe, index) => {
        if (index < TWELVE) {
          acc = [...acc, <RecipeCard
            id={ recipe.idDrink }
            key={ index }
            name={ recipe.strDrink }
            src={ recipe.strDrinkThumb }
            index={ index }
            alt={ `${recipe.strDrink} image` }
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

DrinkRecipeCards.propTypes = {
  recipes: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(DrinkRecipeCards);
