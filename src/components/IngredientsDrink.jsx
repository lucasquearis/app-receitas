import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCocktail from '../Redux/actions/fetchCocktail';

class IngredientsDrink extends Component {
  constructor(props) {
    super(props);

    this.setIngredientsDrinks = this.setIngredientsDrinks.bind(this);
  }

  setIngredientsDrinks() {
    const { cocktail } = this.props;
    const object = cocktail[0];
    const keys = Object.keys(object);
    const values = Object.values(object);

    const ingredientsKeys = keys.filter((item, index) => (
      item.includes('strIngredient') && values[index] !== null
    ));

    const measurementsKeys = keys.filter((item, index) => (
      item.includes('strMeasure') && values[index] !== null
    ));

    return ingredientsKeys.reduce((acc, curr, index) => (
      [
        ...acc,
        {
          [object[curr]]: object[measurementsKeys[index]],
        },
      ]
    ), []);
  }

  render() {
    const ingredients = this.setIngredientsDrinks();
    return (
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {
                `${Object.keys(ingredient)[0]}:
                ${Object.values(ingredient)[0]}`
              }
            </li>
          ))
        }
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  cocktail: state.drinks.cocktails,
});

const mapDispatchToProps = (dispach) => ({
  fetchCocktail: (id) => dispach(fetchCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsDrink);

IngredientsDrink.propTypes = {
  cocktail: PropTypes.objectOf(PropTypes.object),
}.isRequired;
