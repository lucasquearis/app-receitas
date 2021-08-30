import React from 'react';
import { string, number } from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

function RecipeCard(props) {
  const { pathname } = useLocation();
  const { id, thumbnail, title, index, testid } = props;

  return (
    <Link to={ `${pathname}:${id}` }>
      <div data-testid={ testid }>
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

RecipeCard.propTypes = {
  testid: string.isRequired,
  id: string.isRequired,
  thumbnail: string.isRequired,
  title: string.isRequired,
  index: number.isRequired,
};

export default RecipeCard;
