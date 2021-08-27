import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchRecipe from '../Redux/actions/fetchRecipes';

class Ingredients extends Component {
  constructor(props) {
    super(props);

    this.filterIngredients = this.filterIngredients.bind(this);
  }

  filterIngredients() {
    const { recipe } = this.props;
    const max = 15
    const ingredient = recipe.filter(({ strIngredient })=> {
      return Object.keys(recipe)
    })
    console.log(ingredient)
  //   return (
  //     ingredientList.map(({ strIngredients }, index) => (
  //       <li
  //         key={ index }
  //         data-testid={ `${index}-ingredient-name-and-measure` }
  //       >
  //         { `${strIngredients}: ${measureList[index]}` }
  //       </li>
  //     ))
  //   );
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
  fetchRecipe: (id) => dispach(fetchRecipe(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);

