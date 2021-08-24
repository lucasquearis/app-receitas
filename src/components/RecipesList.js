import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

class RecipesList extends Component {
  render() {
    const { meals } = this.props;

    return (
      <div>
        {
          meals.map(({ strMeal, strMealThumb }, index) => (
            <RecipeCard
              key={ index }
              index={ index }
              name={ strMeal }
              thumb={ strMealThumb }
            />
          ))
        }
      </div>
    );
  }
}

RecipesList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default RecipesList;
