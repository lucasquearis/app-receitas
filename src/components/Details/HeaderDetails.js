import React from 'react';
import { string, objectOf } from 'prop-types';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';

export default function HeaderDetails(props) {
  const {
    title,
    photo,
    category,
    data,
  } = props;

  return (
    <div>
      <img src={ photo } alt="" data-testid="recipe-photo" />
      <div>
        <h2 data-testid="recipe-title">{ title }</h2>
        <h4 data-testid="recipe-category">{ category }</h4>
      </div>
      <div>
        <ShareButton recipeDetails={ data } />
        <FavoriteButton recipeDetails={ data } />
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
