import React from 'react';
import { string, number, func } from 'prop-types';
import { Link } from 'react-router-dom';
import './IngredientCard.css';

function IngredientCard(props) {
  const { title, index, path, database, onClick } = props;
  const thumb = `https://www.${database}.com/images/ingredients/${title}-Small.png`;
  return (
    <Link to={ `/${path}` } onClick={ () => onClick(title) }>
      <li className="card-container" data-testid={ `${index}-ingredient-card` }>
        <img
          src={ thumb }
          alt="Ingredient"
          className="card-thumb"
          data-testid={ `${index}-card-img` }
        />
        <h2 data-testid={ `${index}-card-name` }>
          { title }
        </h2>
      </li>
    </Link>
  );
}

IngredientCard.propTypes = {
  title: string.isRequired,
  path: string.isRequired,
  index: number.isRequired,
  database: string.isRequired,
  onClick: func.isRequired,
};

export default IngredientCard;
