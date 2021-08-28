import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredients(props) {
  const { recipe } = props;
  if (!recipe) return '';
  const ingredientKeys = Object.keys(recipe).filter((key) => key.includes('Ingredient'));
  const measureKeys = Object.keys(recipe).filter((key) => key.includes('Measure'));
  const ingredientList = ingredientKeys.map((key) => recipe[key]);
  const measureList = measureKeys.map((key) => recipe[key]);
  const lists = {
    ingredients: ingredientList.filter((item) => item),
    measure: measureList.filter((item) => item),
  };
  return (
    <div className="ingredients-container">
      <h3 className="title-ingrendients">Ingredients</h3>
      <ul className="list">
        {
          lists.ingredients.map((item, key) => (
            <li
              key={ key }
              data-testid={ `${key}-ingredient-name-and-measure` }
            >
              { `${item} - ${lists.measure[key]}` }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};
