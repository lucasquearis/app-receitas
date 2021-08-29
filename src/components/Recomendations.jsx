import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipe from '../Redux/actions/fetchRecipes';

class Recomendations extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <section>
        <div data-testid="0-recomendation-card">
          {
            recipe.map(({ strMeal }, index) => (
              <p key={ index }>{ strMeal }</p>
          ))
          }
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Recomendations);

Recomendations.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
}.isRequired;
