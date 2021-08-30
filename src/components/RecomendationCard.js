import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import genericFetchAPI from '../services/genericFetchAPI';
import './RecomendationCard.css';

function RecomendationCard({ type }) {
  const [recomendations, setRecomendations] = useState([]);
  const MAX_CARD_RECOMENDATIONS = 6;

  useEffect(() => {
    const getRecomendations = async () => {
      if (type === 'meals') {
        setRecomendations((await genericFetchAPI('meal', 'search', 's', '')).meals);
      } else {
        setRecomendations(
          (await genericFetchAPI('cocktail', 'search', 's', '')).drinks,
        );
      }
    };
    getRecomendations();
  }, [type]);

  useEffect(() => console.log(recomendations), [recomendations]);

  return recomendations.length ? (
    <section className="recomendation-cards">
      {recomendations.map((recipe, index) => (index < MAX_CARD_RECOMENDATIONS ? (
        <div data-testid={ `${index}-recomendation-card` } key={ index }>
          <img src={ recipe.strMealThumb || recipe.strDrinkThumb } alt="Recipe Thumb" />
          <h6>{ recipe.strMeal || recipe.strDrink }</h6>
        </div>
      ) : null))}
    </section>
  ) : <p>Loading</p>;
}

RecomendationCard.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecomendationCard;
