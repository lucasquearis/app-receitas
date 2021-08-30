import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';
import favIconChecked from '../images/blackHeartIcon.svg';

export default function FavoriteCard({
  img,
  category,
  title,
  index,
  recipes,
  handleDelete,
}) {
  const foodURL = 'http://localhost:3000/comidas/';
  const drinkURL = 'http://localhost:3000/bebidas/';

  const [msgLink, setMsgLink] = useState('');
  const { id, type } = recipes;

  const onClickShare = () => {
    setMsgLink('Link copiado!');
    if (recipes.type.includes('comida')) {
      navigator.clipboard.writeText(`${foodURL}${id}`);
    } else {
      navigator.clipboard.writeText(`${drinkURL}${id}`);
    }
  };

  return (
    <Card style={ { width: '90%' } }>
      <Link to={ type === 'comida' ? `comidas/${id}` : `bebidas/${id}` }>
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
      </Link>
      <div>
        <p>{msgLink}</p>
        <button
          type="button"
          style={ { border: 'none', background: 'none' } }
          onClick={ onClickShare }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Compartilhar"
          />
        </button>
        <button
          type="button"
          style={ { border: 'none', background: 'none' } }
          onClick={ handleDelete }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ favIconChecked }
            alt="Favoritar"
          />
        </button>
      </div>
    </Card>
  );
}

FavoriteCard.propTypes = {
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  recipes: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
};
