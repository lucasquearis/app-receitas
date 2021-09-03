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
    <Card
      className="d-flex flex-row p-3"
    >
      <Link
        to={ type === 'comida' ? `comidas/${id}` : `bebidas/${id}` }
      >
        <Card.Img
          style={ { width: '150px' } }
          data-testid={ `${index}-horizontal-image` }
          src={ img }
        />
      </Link>
      <div>
        <Link
          to={ type === 'comida' ? `comidas/${id}` : `bebidas/${id}` }
          className="w-50"
        >
          <Card.Body className="d-flex flex-column">
            <Card.Title data-testid={ `${index}-horizontal-name` }>{title}</Card.Title>
            <Card.Text
              data-testid={ `${index}-horizontal-top-text` }
            >
              {category}
            </Card.Text>
          </Card.Body>
        </Link>
        <div className="d-flex justify-content-start pl-4">
          <p>{msgLink}</p>
          <button
            type="button"
            className="bg-transparent border-0 mr-3"
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
            className="bg-transparent border-0"
            onClick={ handleDelete }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ favIconChecked }
              alt="Favoritar"
            />
          </button>
        </div>
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
