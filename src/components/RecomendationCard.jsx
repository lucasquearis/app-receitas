import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchDrinks from '../services/Header-SearchBar/Drinks/fetchDrinks';
import fetchFoods from '../services/Header-SearchBar/Foods/fetchFoods';
import Loading from './Loading';

const RecomendationCard = ({ page }) => {
  const [recomendationCards, setRecomendationCards] = useState([]);

  useEffect(() => {
    const resolveAPI = async () => {
      const { drinks } = await fetchDrinks();
      const { meals } = await fetchFoods();
      switch (page) {
      case 'meals':
        setRecomendationCards(drinks);
        break;
      case 'drinks':
        setRecomendationCards(meals);
        break;
      default:
        break;
      }
    };
    resolveAPI();
  }, [page]);

  if (recomendationCards.length > 0 && page === 'meals') {
    return (
      <ul>
        {recomendationCards.map((item, index) => {
          const MAX_CARDS = 6;
          const { idDrink, strDrink, strAlcoholic, strDrinkThumb } = item;
          if (index > MAX_CARDS - 1) {
            return false;
          }
          return (
            <li data-testid={ `${index}-recomendation-card` } key={ idDrink }>
              <p data-testid={ `${index}-recomendation-title` }>{ strDrink }</p>
              <p>{ strAlcoholic }</p>
              <img src={ strDrinkThumb } alt={ strDrink } />
            </li>
          );
        })}
      </ul>
    );
  }

  if (recomendationCards.length > 0 && page === 'drinks') {
    return (
      <ul>
        {recomendationCards.map((item, index) => {
          const MAX_CARDS = 6;
          const { idMeal, strMeal, strMealThumb } = item;
          if (index > MAX_CARDS - 1) {
            return false;
          }
          return (
            <li data-testid={ `${index}-recomendation-card` } key={ idMeal }>
              <p>{ strMeal }</p>
              <img src={ strMealThumb } alt={ strMeal } />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <Loading />
  );
};

RecomendationCard.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default RecomendationCard;
