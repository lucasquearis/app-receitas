import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ingredients from '../recipedetails/Ingredients';
import Instructions from '../recipedetails/Instructions';
import Video from '../recipedetails/Video';
import Recomendations from '../recipedetails/Recomendations';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';

class DetailsDrink extends Component {
  render() {
    const { match: { params: { id } } } = this.props;

    return (
      <div>
        <header>
          <div>
            <img
              data-testid="recipe-photo"
              alt="receita deliciosa"
            />
          </div>
          <div>
            <h1 data-testid="recipe-title">
              Receita ID:
              { id }
            </h1>
            <h2 data-testid="recipe-category">Recipe category</h2>
          </div>
        </header>

        <Ingredients />
        <Instructions />
        <Video />
        <Recomendations />

        <button type="button" data-testid="start-recipe-btn">Start recipe</button>
        <button type="button" onClick="">
          <img src={ ShareIcon } alt="share button" data-testid="share-btn" />
        </button>
        <button type="button" onClick="">
          <img src={ WhiteHeartIcon } alt="favorite button" data-testid="favorite-btn" />
        </button>
      </div>
    );
  }
}

DetailsDrink.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

export default DetailsDrink;
