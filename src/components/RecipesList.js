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

    if (type === 'foods') return this.renderFoods();
    if (type === 'drinks') return this.renderDrinks();
  }
}

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default RecipesList;
