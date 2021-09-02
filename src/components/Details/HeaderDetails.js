import React from 'react';
import { string, objectOf } from 'prop-types';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';
import './HeaderDetails.css';

export default function HeaderDetails(props) {
  const {
    title,
    photo,
    category,
    data,
  } = props;

  return (
    <div>
      <img className="thumb" src={ photo } alt="" data-testid="recipe-photo" />
      <div className="header">
        <div>
          <h2 data-testid="recipe-title">{ title }</h2>
          <h4 data-testid="recipe-category">{ category }</h4>
        </div>
        <div className="buttons">
          <ShareButton recipeDetails={ data } />
          <FavoriteButton recipeDetails={ data } />
        </div>

      </div>

    </div>
  );
}

HeaderDetails.propTypes = {
  title: string.isRequired,
  photo: string.isRequired,
  category: string.isRequired,
  data: objectOf.isRequired,
};
