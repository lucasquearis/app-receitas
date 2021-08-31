import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipes from '../Redux/actions/fetchRecipes';

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.taskItem = this.taskItem.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
    this.state = {
      className:''
    }
  }

  setIngredients() {
    const { recipe } = this.props;
    const object = recipe[0];
    const keys = Object.keys(object);
    const values = Object.values(object);

    const ingredientsKeys = keys.filter((item, index) => (
      item.includes('strIngredient') && values[index] !== ''
      && item.includes('strIngredient') && values[index] !== null
    ));

    const measurementsKeys = keys.filter((item, index) => (
      item.includes('strMeasure') && values[index] !== ' '
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
 
  taskItem({target: {checked, value, index}}) {
    if (checked){
      this.setState({className: 'complet'});
      console.log('marquei', index)
    }
  }

  render() {
    const ingredients = this.setIngredients();
    const {className}= this.state
    return (
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <h2
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className=""
            >
              <input
                key={ index }
                type="checkbox"
                onClick={ (e) => this.taskItem(e)}
              />
              {
                `${Object.keys(ingredient)[0]}:
                ${Object.values(ingredient)[0]}`
              }
            </h2>
          ))
        }
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
