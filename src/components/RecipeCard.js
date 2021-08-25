import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeCard extends Component {
  render() {
    const { name, thumb, index } = this.props;

    return (
      <div className="col">
        <div
          className="card"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ thumb }
            alt={ name }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{name}</p>
        </div>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  thumb: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default RecipeCard;
