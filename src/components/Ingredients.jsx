import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipes from '../Redux/actions/fetchRecipes';

class Ingredients extends Component {
  constructor(props) {
    super(props);

    this.filterIngredients = this.filterIngredients.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.getMeasurements = this.getMeasurements.bind(this);
  }

  getIngredients() {
    const { recipe } = this.props;
    const object = recipe[0];
    const keys = Object.keys(object);
    const values = Object.values(object);

    const ingredients = keys.filter((item, index) => (
      item.includes('strIngredient') && values[index] !== ''
    ));

    return ingredients;
  }

  getMeasurements() {
    const { recipe } = this.props;
    const object = recipe[0];
    const keys = Object.keys(object);
    const values = Object.values(object);

    const measurements = keys.filter((item, index) => (
      item.includes('strMeasure') && values[index] !== ''
    ));

    return measurements;
  }

  filterIngredients() {
    const { recipe } = this.props;
    const object = recipe[0];

    const ingredients = this.getIngredients();

    return (
      <div>
        {
          ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${object[ingredient]}` }
            </li>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <ul>
        { this.filterIngredients() }
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
});

const mapDispatchToProps = (dispach) => ({
  setRecipes: (id) => dispach(fetchRecipes(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);

Ingredients.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
  setRecipe: PropTypes.func,
}.isRequired;
