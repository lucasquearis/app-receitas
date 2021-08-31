import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { copyToClipboardDone } from '../../services';
import shareIcon from '../../images/shareIcon.svg';
import BlackHeart from '../../images/blackHeartIcon.svg';

export default function RecipesDoneCard({ recipe, index, setFavoriteRecipes }) {
  const [copyLink, setCopyLink] = useState('');

  const handleClick = (id, foodOrDrink) => {
    copyToClipboardDone(id, foodOrDrink);
    setCopyLink('Link copiado!');
  };

  const handleFavoriteClick = (id) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const removeFav = favoriteRecipes.filter((each) => each.id !== id);
    setFavoriteRecipes(removeFav);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
  };

  return (
    <div>
      <Card>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <CardMedia
            component="img"
            alt={ recipe.name }
            height="200"
            image={ recipe.image }
            title={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <CardContent>
          <Typography
            data-testid={ `${index}-horizontal-top-text` }
            variant="subtitle1"
            color="textSecondary"
          >
            { recipe.type === 'comida'
              ? (`${recipe.area} - ${recipe.category}`) : recipe.alcoholicOrNot }
          </Typography>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <Typography
              data-testid={ `${index}-horizontal-name` }
              component="h5"
              variant="h5"
            >
              { recipe.name }
            </Typography>
          </Link>
          <Typography
            data-testid={ `${index}-horizontal-done-date` }
            variant="subtitle1"
            color="textSecondary"
          >
            { recipe.doneDate }
          </Typography>
          <button
            onClick={ () => handleClick(recipe.id, recipe.type) }
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIt"
            />
          </button>

          <button
            onClick={ () => handleFavoriteClick(recipe.id) }
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ BlackHeart }
              alt="favorite"
            />
          </button>

          <Typography
            variant="subtitle1"
            color="textSecondary"
          >
            { copyLink }
          </Typography>
        </CardContent>
        <div />
      </Card>
    </div>
  );
}

RecipesDoneCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
  index: PropTypes.number,
}.isRequired;
