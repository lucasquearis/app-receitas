import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ShareIcon from '../../../components/Icons/ShareIcon';
import FavoriteIcon from '../../../components/Icons/FavoriteIcon';
import './Card.css';

function FavoriteCard({ item, index }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    setIsCopied(true);
  };
  return (
    <Container>
      <div className="card-container">
        <Link className="card-image" to={ `${item.type}s/${item.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ item.image }
            alt={ item.name }
          />
        </Link>
        <div className="text-container">
          { item.area
            ? (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${item.area} - ${item.category}`}
              </p>
            )
            : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {item.alcoholicOrNot}
              </p>
            )}
          <Link to={ `${item.type}s/${item.id}` }>
            <h5
              data-testid={ `${index}-horizontal-name` }
              className="card-name"
            >
              {item.name}
            </h5>
          </Link>
          <div className="icons-container">
            <ShareIcon
              url={ `/${item.type}s/${item.id}` }
              onClick={ handleClick }
              dataTestId={ `${index}-horizontal-share-btn` }
            />
            <FavoriteIcon
              dataTestId={ `${index}-horizontal-favorite-btn` }
              recipe={ item }
            />
            {isCopied && <p className="copied-msg">Link copiado!</p>}

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
  index: PropTypes.number.isRequired,
};

export default FavoriteCard;
