import PropTypes from 'prop-types';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

function Cards({ type, list }) {
  const id = `id${type}`;
  const img = `str${type}Thumb`;
  const cardName = `str${type}`;

  switch (list.length) {
  case 0:
    return <div>Carregando...</div>;

  case 1:
    return (
      <Redirect
        to={ (type === 'Meal' ? '/comidas/' : '/bebidas/') + list[0][id] }
      />
    );

  default:
    break;
  }

  return (
    <div className="cardsContent">
      {list.map((item, i) => (
        <Link
          to={ ({ pathname }) => `/${pathname}/${item[id]}` }
          key={ i }
          className="cardFlex"
          data-testid={ `${i}-recipe-card` }
        >
          <img
            className="cardTumb"
            src={ item[img] }
            alt="imagem da comida"
            data-testid={ `${i}-card-img` }
          />
          <span data-testid={ `${i}-card-name` }>{item[cardName]}</span>
        </Link>
      ))}
    </div>
  );
}

Cards.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
};

export default Cards;
