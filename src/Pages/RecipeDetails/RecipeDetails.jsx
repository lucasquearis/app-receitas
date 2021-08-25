import React from 'react';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '../../Components/IconBtn';

function RecipeDetails() {
  const titleProps = {
    'data-testid': 'recipe-title',
  };
  const imgProps = {
    src: 'image',
    'data-testid': 'recipe-photo',
  };
  const shareBtn = {
    name: 'share',
    'data-testid': 'share-btn',
    icon: ShareIcon,
    alt: 'shareIcon',
    type: 'button',
    variant: 'contained',
  };
  const favBtn = {
    name: 'favorite',
    'data-testid': 'explore-favorite-btn',
    icon: FavoriteIcon,
    alt: 'favoriteIcon',
    type: 'button',
    variant: 'contained',
  };
  return (
    <>
      <h1 { ...titleProps }>Title</h1>
      <img alt="food" { ...imgProps } />
      <IconButton { ...shareBtn } />
      <IconButton { ...favBtn } />
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeDetails;
