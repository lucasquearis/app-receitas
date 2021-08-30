import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import FavRecipeShareAndFavBtn from './FavRecipeShareAndFavBtn';

export default function FavoriteCard({ img, category, title, index, recipe }) {
  return (
    <Card style={ { width: '90%' } }>
      <Card.Img
        style={ { width: '100px' } }
        data-testid={ `${index}-horizontal-image` }
        src={ img }
      />
      <Card.Title
        data-testid={ `${index}-horizontal-top-text` }
      >
        {category}
      </Card.Title>
      <Card.Title data-testid={ `${index}-horizontal-name` }>{title}</Card.Title>
      <FavRecipeShareAndFavBtn recipes={ recipe } index={ index } />
    </Card>
  );
}

FavoriteCard.propTypes = {
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
};
