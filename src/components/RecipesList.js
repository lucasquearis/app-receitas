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

    return (
      <div className="row row-cols-3 row-cols-md-3 g-4">
        {
          recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
            <RecipeCard
              key={ index }
              id={ idMeal }
              index={ index }
              name={ strMeal }
              thumb={ strMealThumb }
              type="food"
            />
          ))
        }
      </div>
    );
  }

  renderDrinks() {
    const recipes = this.filterTwelveRecipes();

    return (
      <div className="row row-cols-3 row-cols-md-3 g-4">
        {
          recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <RecipeCard
              key={ index }
              id={ idDrink }
              index={ index }
              name={ strDrink }
              thumb={ strDrinkThumb }
              type="drink"
            />
          ))
        }
      </div>
    )
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
