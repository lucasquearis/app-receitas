import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchDrinks from '../services/Header-SearchBar/Drinks/fetchDrinks';
import fetchFoods from '../services/Header-SearchBar/Foods/fetchFoods';
import Loading from './Loading';
import './componentCSS/RecomendationCard.css';

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
      <div className="details__carousel-cards-wrapper">
        <div className="details__carousel-cards">
          {recomendationCards.map((item, index) => {
            const MAX_CARDS = 6;
            const { idDrink, strDrink, strAlcoholic, strDrinkThumb } = item;
            if (index > MAX_CARDS - 1) {
              return false;
            }
            return (
              <div
                data-testid={ `${index}-recomendation-card` }
                className="details__carousel-card"
                key={ idDrink }
              >
                <p data-testid={ `${index}-recomendation-title` }>{ strDrink }</p>
                <p>{ strAlcoholic }</p>
                <img src={ strDrinkThumb } alt={ strDrink } />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (recomendationCards.length > 0 && page === 'drinks') {
    return (
      <div className="details__carousel-cards-wrapper">
        <div className="details__carousel-cards">
          {recomendationCards.map((item, index) => {
            const MAX_CARDS = 6;
            const { idMeal, strMeal, strMealThumb } = item;
            if (index > MAX_CARDS - 1) {
              return false;
            }
            return (
              <div
                data-testid={ `${index}-recomendation-card` }
                className="details__carousel-card"
                key={ idMeal }
              >
                <p data-testid={ `${index}-recomendation-title` }>{ strMeal }</p>
                <img src={ strMealThumb } alt={ strMeal } />
              </div>
            );
          })}
        </div>
      </div>
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
