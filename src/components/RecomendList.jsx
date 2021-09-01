import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecomendListHandle = (array, type) => {
  const recomendlegth = 6;
  if (array === null || array === undefined || type === undefined) return <p>Erro</p>;
  if (type === 'comidas' && array.drinks) {
    const obj = array.drinks.map((n, index) => (
      <Link key={ index } to={ `/bebidas/${n.idDrink}` }>
        <div
          className="RecommendCard"
          data-testid={ `${index}-recomendation-card` }
        >
          <p
            data-testid={ `${index}-recomendation-title` }
            className="recipeName"
          >
            {n.strDrink}
          </p>
          <img className="RecomendImg" alt="recomendamos!" src={ n.strDrinkThumb } />
        </div>

      </Link>
    ));
    return obj.slice(0, recomendlegth);
  }
  if (type === 'bebidas' && array.meals) {
    const obj = array.meals.map((n, index) => (
      <Link key={ index } to={ `/comidas/${n.idMeal}` }>
        <div
          className="RecommendCard"
          data-testid={ `${index}-recomendation-card` }
        >
          <p
            data-testid={ `${index}-recomendation-title` }
            className="recipeName"
          >
            {n.strMeal}
          </p>
          <img className="RecomendImg" alt="recomendamos!" src={ n.strMealThumb } />
        </div>
      </Link>
    ));
    return obj.slice(0, recomendlegth);
  }
};

const RecomendExist = (objeto) => {
  if (objeto === null || objeto === undefined) return null;
  return objeto;
};

export default function RecomendList(props) {
  const { type, list } = props;
  return (
    <>
      {RecomendListHandle(RecomendExist(list), type)}
    </>
  );
}

const { string, objectOf } = PropTypes;
RecomendList.propTypes = {
  type: string.isRequired,
  list: objectOf(string.isRequired).isRequired,
};
