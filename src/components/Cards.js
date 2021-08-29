import React, { useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import useAPI from '../hooks/useAPI';

function Cards() {
  const { pathname } = useLocation();
  const { recipes, searchByFilters } = useAPI(pathname);

  const min = 0;
  const max = 12;

  let type;
  let list;

  switch (pathname) {
  case '/comidas':
    type = 'Meal';
    list = recipes.meals;
    break;

  case '/bebidas':
    type = 'Drink';
    list = recipes.drinks;
    break;

  default:
    break;
  }

  const id = `id${type}`;
  const img = `str${type}Thumb`;
  const cardName = `str${type}`;
  const cards = list.slice(min, max);

  useEffect(() => {
    if (cards.length === 0) searchByFilters();
  });

  switch (cards.length) {
  case 0:
    return <div>Carregando...</div>;

  case 1:
    return <Redirect to={ `${pathname}/${cards[0][id]}` } />;

  default:
    break;
  }

  return (
    <div className="cardsContent">
      {cards.map((item, i) => (
        <Link
          to={ `${pathname}/${item[id]}` }
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

export default Cards;
