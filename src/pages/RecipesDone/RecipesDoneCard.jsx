import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { copyToClipboardDone } from '../../services';
import shareIcon from '../../images/shareIcon.svg';

export default function RecipesDoneCard({ recipe, index }) {
  const [copyLink, setCopyLink] = useState('');

  const handleClick = (id, foodOrDrink) => {
    copyToClipboardDone(id, foodOrDrink);
    setCopyLink('Link copiado!');
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
          <Typography
            data-testid={ `${index}-horizontal-name` }
            component="h5"
            variant="h5"
          >
            { recipe.name }
          </Typography>
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
          <Typography
            data-testid={ `${index}-horizontal-done-date` }
            variant="subtitle1"
            color="textSecondary"
          >
            { recipe.doneDate }
          </Typography>
          <ul>
            {recipe.tags.map((tag, i) => (
              <li
                key={ i }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </li>))}
          </ul>
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
