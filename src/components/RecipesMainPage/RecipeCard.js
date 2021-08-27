import React from 'react';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard(props) {
  const { thumb, title, index, id, path } = props;
  return (
    <Link to={ `/${path}/${id}` }>
      <li className="card-container" data-testid={ `${index}-recipe-card` }>
        <img
          src={ thumb }
          alt="Recipe"
          className="card-thumb"
          data-testid={ `${index}-card-img` }
        />
        <h5 data-testid={ `${index}-card-name` }>
          { title }
        </h5>
      </li>
    </Link>
  );
}

RecipeCard.propTypes = {
  thumb: string.isRequired,
  title: string.isRequired,
  path: string.isRequired,
  index: number.isRequired,
  id: string.isRequired,

};

export default RecipeCard;
