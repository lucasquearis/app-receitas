import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipe from '../Redux/actions/fetchRecipes';
import fetchCocktail from '../Redux/actions/fetchCocktail';

class Recomendations extends Component {
  render() {
    const { recipe, cocktail } = this.props;
    return (
      <section>
        <div data-testid="0-recomendation-card">
          {
            recipe.map(({ strMeal }, index) => (
              <p key={ index }>{ strMeal }</p>
            ))
          }
          {
            cocktail.map(({ strDrink }, index) => (
              <p key={ index }>{ strDrink }</p>
            ))
          }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
  cocktail: state.drinks.cocktails,
});

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipe(id)),
  fetchCocktail: (id) => dispach(fetchCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recomendations);

Recomendations.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
}.isRequired;
