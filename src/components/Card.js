import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './Header/Header.module.css';
import './Card.css';

function Card({ item, index }) {
  return (
    <div
      key={ item.idMeal || item.idDrink }
      data-testid={ `${index}-recipe-card` }
    >
      <div className="card-img-top">
        <img
          src={ item.strMealThumb || item.strDrinkThumb }
          alt={ item.strMeal || item.strDrink }
          data-testid={ `${index}-card-img` }
          className={ styles.imagem }
        />
      </div>
      <div>
        <h2 data-testid={ `${index}-card-name` }>
          { item.strMeal || item.strDrink }
        </h2>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
