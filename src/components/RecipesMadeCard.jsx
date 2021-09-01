import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShareButton from './shareButton';

class RecipesMadeCard extends Component {
  constructor(props) {
    super(props);

    this.renderFoodCard = this.renderFoodCard.bind(this);
    this.renderDrinkCard = this.renderDrinkCard.bind(this);
  }

  renderFoodCard() {
    const {
      id,
      image,
      category,
      name,
      doneDate,
      tags,
      area,
      type,
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
            <ShareButton
              position={ index }
              id={ id }
              type={ type }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              <span>{ `${area} - ` }</span>
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

  renderDrinkCard() {
    const {
      id,
      type,
      image,
      alcoholicOrNot,
      name,
      doneDate,
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
            <ShareButton
              position={ index }
              id={ id }
              type={ type }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
            <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { type } = this.props;

    return (
      type === 'comida'
        ? this.renderFoodCard()
        : this.renderDrinkCard()
    );
  }
}

export default RecipesMadeCard;

RecipesMadeCard.propTypes = {
  image: PropTypes.string,
}.isRequired;
