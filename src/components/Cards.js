import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Cards() {
  const { API } = useContext(RecipesContext);
  const { pathname, action, recipes, searchByFilters, searchByArea } = API;

  const min = 0;
  const max = 12;

  let type;
  let list;
  let endpoint;

  if (/comidas/.test(pathname)) {
    type = 'Meal';
    list = recipes.meals;
    endpoint = '/comidas';
  } else if (/bebidas/.test(pathname)) {
    type = 'Drink';
    list = recipes.drinks;
    endpoint = '/bebidas';
  }

  const id = `id${type}`;
  const img = `str${type}Thumb`;
  const cardName = `str${type}`;
  const cards = list.slice(min, max);

  function didMount() {
    if (cards.length === 0) {
      if (/area/.test(pathname)) {
        searchByArea('american');
      } else {
        searchByFilters();
      }
    }
  }

  useEffect(didMount);

  switch (cards.length) {
  case 0:
    return <div>Carregando...</div>;

  case 1:
    if (action === 'search-filters') {
      return <Redirect to={ `/redirecting${endpoint}/${cards[0][id]}` } />;
    }
    break;

  default:
    break;
  }

  return (
    <div className="cardsContent">
      {cards.map((item, i) => (
        <Link
          to={ `/redirecting${endpoint}/${item[id]}` }
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
