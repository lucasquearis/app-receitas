import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

function RecipeCard(props) {
  const { pathname } = useLocation();
  const { id, thumbnail, title, index } = props;

  return (
    <Link className="recipe-cards" to={ `${pathname}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ thumbnail }
          data-testid={ `${index}-card-img` }
          alt={ title }
        />
        <div>
          <h4 data-testid={ `${index}-card-name` }>
            { title }
          </h4>
        </div>
      </div>
    </Link>
  );
}

const { string, number } = PropTypes;
RecipeCard.defaultProps = {
  id: null,
  thumbnail: '',
};
RecipeCard.propTypes = {
  id: string,
  thumbnail: string,
  title: string.isRequired,
  index: number.isRequired,
};

export default RecipeCard;
