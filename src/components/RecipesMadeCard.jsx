import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

class RecipesMadeCard extends Component {
  render() {
    const {
      image,
      category,
      name,
      doneDate,
      tags,
      index,
    } = this.props;

    return (
      <div className="row">
        <div className="card-list-food">
          <div>
            <img
              src={ image }
              className="card-img"
              alt="card"
              data-testid={ `${index}-horizontal-image` }
            />
          </div>

          <div>
            <button type="button" className="share-fill">
              <img
                src={ ShareIcon }
                alt="share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              <span>Italian - </span>
              <span>{ category }</span>
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
            {
              tags.map((tag, i) => (
                <span
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ i }
                >
                  { tag }
                </span>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default RecipesMadeCard;

RecipesMadeCard.propTypes = {
  image: PropTypes.string,
}.isRequired;
