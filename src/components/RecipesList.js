import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

class RecipesList extends Component {
  constructor(props) {
    super(props);

    this.filterTwelveRecipes = this.filterTwelveRecipes.bind(this);
  }

  filterTwelveRecipes() {
    const { recipes } = this.props;
    const TWELVE = 12;

    return recipes.filter((_element, index) => index < TWELVE);
  }

  renderFoods() {
    const recipes = this.filterTwelveRecipes();

    return recipes.map(({ strMeal, strMealThumb }, index) => (
      <RecipeCard
        key={ index }
        index={ index }
        name={ strMeal }
        thumb={ strMealThumb }
      />
    ));
  }

  renderDrinks() {
    const recipes = this.filterTwelveRecipes();

    return recipes.map(({ strDrink, strDrinkThumb }, index) => (
      <RecipeCard
        key={ index }
        index={ index }
        name={ strDrink }
        thumb={ strDrinkThumb }
      />
    ));
  }

  render() {
    const { type } = this.props;

    return (
      <div>
        {
          type === 'foods'
            ? this.renderFoods()
            : this.renderDrinks()
        }
      </div>
    );
  }
}

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default RecipesList;
