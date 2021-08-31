import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Instructions extends Component {
  render() {
    const { recipe, cocktail } = this.props;
    return (
      <section data-testid="instructions">
        {
          recipe.map(({ strInstructions }, index) => (
            <p key={ index }>{ strInstructions }</p>
          ))
        }
        {
          cocktail.map(({ strInstructions }, index) => (
            <p key={ index }>{ strInstructions }</p>
          ))
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
  cocktail: state.drinks.cocktails,
});

export default connect(mapStateToProps)(Instructions);

Instructions.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
}.isRequired;
