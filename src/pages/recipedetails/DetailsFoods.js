import React, { Component } from 'react';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Video from './Video';
import Recomendations from './Recomendations';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';

class DetailsFoods extends Component {
  render() {
    return (
      <div>
        <header>
          <div>
            <img data-testid="recipe-photo" />
          </div>
          <div>
            <h1 data-testid="recipe-title">Title</h1>
            <h2 data-testid="recipe-category">Recipe category</h2>
          </div>
        </header>
        <Ingredients />
        <Instructions />
        <Video />
        <Recomendations />
        <button
          type="button"
          data-testid="start-recipe-btn">
          Start recipe
        </button>
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

export default DetailsFoods;
