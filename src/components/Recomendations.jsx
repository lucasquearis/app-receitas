import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Recomendations extends Component {
  render() {
    const { meals, drinks } = this.props;
    return (
      <section>
        <div data-testid="0-recomendation-card">
          {
            meals.map(({ strMeal }, index) => (
              <p key={ index }>{ strMeal }</p>
            ))
          }
          {
            drinks.map(({ strDrink }, index) => (
              <p key={ index }>{ strDrink }</p>
            ))
          }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.foods.meals,
  drinks: state.drinks.drinks,
});

export default connect(mapStateToProps)(Recomendations);

Recomendations.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
}.isRequired;
