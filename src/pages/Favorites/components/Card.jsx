import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ShareIcon from '../../../components/Icons/ShareIcon';
import FavoriteIcon from '../../../components/Icons/FavoriteIcon';
import './Card.css';

function FavoriteCard({ item }) {
  return (
    <Container>
      <div className="card-container">
        <Link className="card-image" to={ `${item.type}s/${item.id}` }>
          <img src={ item.image } alt={ item.name } />
        </Link>
        <div className="text-container">
          { item.area
            ? (
              <p>{`${item.area} - ${item.category}`}</p>
            )
            : (
              <p>{item.category}</p>
            )}
          <Link to={ `${item.type}s/${item.id}` }>
            <h5 className="card-name">{item.name}</h5>
          </Link>
          <div className="icons-container">
            <ShareIcon />
            <FavoriteIcon recipe={ item } />
          </div>
        </div>
      </div>
    </Container>
  );
}

FavoriteCard.propTypes = {
  item: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default FavoriteCard;
