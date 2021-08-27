import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchRecipe from '../Redux/actions/fetchRecipes';

class Instructions extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <section data-testid="instructions">
        {
          recipe.map(({ strInstructions }, index) => (
            <p key={index}>{ strInstructions }</p>
          ))
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
});

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipe(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);
