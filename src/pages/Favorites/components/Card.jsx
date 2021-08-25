import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Button } from 'react-bootstrap';

import share from '../../../images/shareIcon.svg';
import heart from '../../../images/whiteHeartIcon.svg';
import fullHeart from '../../../images/blackHeartIcon.svg';
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
            {/* <img src={} /> */}
          </div>
        </div>
      </div>
    </Container>
  );
}

Card.propTypes = {
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
