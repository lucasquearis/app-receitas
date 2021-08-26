import React, { useEffect, useState } from 'react';
import {
  getRecomendationsDrinks,
  getRecomendationsMeals } from '../services/apiRequisitions';

function RecomendationCard(type) {
  const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    const getRecomendations = async () => {
      if (type === 'meals') setRecomendations(await getRecomendationsMeals());
      else setRecomendations(await getRecomendationsDrinks());
      console.log('mamaue');
    };
    getRecomendations();
  }, [type]);

  return recomendations.length ? (
    <section>
      {recomendations.map((recipe, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ index }>
          {`${index}-teste`}
        </div>
      ))}
    </section>
  ) : null;
}

export default RecomendationCard;
