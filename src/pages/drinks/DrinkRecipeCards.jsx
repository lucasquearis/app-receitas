import React from 'react';
import { arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';

const num = 12;

function DrinkRecipeCards({ recipes }) {
  const firstTwelve = recipes.filter((_recipe, index) => index < num);

  return (
    <>

      {firstTwelve.map((recipe, index) => (
        <RecipeCard
          id={ recipe.idDrink }
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
  recipes: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(DrinkRecipeCards);
