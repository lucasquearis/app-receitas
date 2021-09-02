import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

class RecipesFavoriteCard extends Component {
  constructor(props) {
    super(props);

    this.renderFoodCard = this.renderFoodCard.bind(this);
    this.renderDrinkCard = this.renderDrinkCard.bind(this);
    this.redirectToDetails = this.redirectToDetails.bind(this);
  }

  redirectToDetails() {
    const { id, type } = this.props;
    const path = `http://localhost:3000/${type}s/${id}`;

    return <Redirect to={ path } />;
  }

  renderFoodCard() {
    const {
      id,
      image,
      category,
      name,
      area,
      type,
      index,
    } = this.props;

    return (
      <div className="row">
        <div className="card-list-food">
          <div>
            <Link to={ `/${type}s/${id}` }>
              <img
                src={ image }
                className="card-img"
                alt="card"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>

          <div>
            <p data-testid={ `${index}-horizontal-top-text` }>
              <span>{ `${area} - ` }</span>
              <span>{ category }</span>
            </p>
            <Link to={ `/${type}s/${id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            </Link>
            <ShareButton
              position={ index }
              id={ id }
              type={ type }
            />
            <FavoriteButton
              position={ index }
              favorite
            />
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
      index,
    } = this.props;

    return (
      <div className="row">
        <div className="card-list-food">
          <div>
            <Link to={ `/${type}s/${id}` }>
              <img
                src={ image }
                className="card-img"
                alt="card"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>

          <div>
            <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
            <Link to={ `/${type}s/${id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            </Link>
            <ShareButton
              position={ index }
              id={ id }
              type={ type }
            />
            <FavoriteButton
              position={ index }
              favorite
            />
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

export default RecipesFavoriteCard;

RecipesFavoriteCard.propTypes = {
  image: PropTypes.string,
}.isRequired;
