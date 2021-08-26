import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import ShareIcon from '../../../components/Icons/ShareIcon';
import FavoriteIcon from '../../../components/Icons/FavoriteIcon';
import './Card.css';

function FavoriteCard({ item }) {
  console.log(item.area);
  return (
    <Container>
      <div className="card-container">
        <img className="card-image" src={ item.image } alt={ item.name } />
        <div className="text-container">
          { item.area
            ? (
              <p>{`${item.area} - ${item.category}`}</p>
            )
            : (
              <p>{item.category}</p>
            )}
          <h5 className="card-name">{item.name}</h5>
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
