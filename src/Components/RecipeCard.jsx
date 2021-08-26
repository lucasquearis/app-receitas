import { React } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

function RecipeCard(props) {
  const { pathname } = useLocation();
  const { id, thumbnail, title, index, dataId } = props;

  return (
    <Link to={ `${pathname}:${id}` }>
      <div data-testid={ `${index}${dataId}` }>
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

RecipeCard.propTypes = {
  id: string.isRequired,
  dataId: string.isRequired,
  thumbnail: string.isRequired,
  title: string.isRequired,
  index: number.isRequired,
};

export default RecipeCard;
