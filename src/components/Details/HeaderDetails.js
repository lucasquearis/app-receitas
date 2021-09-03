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
    <>
      <div className="header-img">
        <img src={ photo } alt="" data-testid="recipe-photo" />
      </div>
      <div className="step1-container">
        <h3 data-testid="recipe-title">{ title }</h3>
        <div className="share-fav-btn-container">
          <ShareButton recipeDetails={ data } />
          <FavoriteButton recipeDetails={ data } />
        </div>
      </div>
      <div className="category-container">
        <h6 data-testid="recipe-category">{ category }</h6>
      </div>
    </>
  );
}

HeaderDetails.propTypes = {
  title: string.isRequired,
  photo: string.isRequired,
  category: string.isRequired,
  data: objectOf.isRequired,
};
