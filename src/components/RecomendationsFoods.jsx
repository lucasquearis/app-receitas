import React, { useEffect, useState } from 'react';

function RecomendationsFoods() {
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    const urlFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const limit = 6;

    const fetchDetailsRecipe = async () => {
      const request = await fetch(`${urlFoods}`);
      const response = await request.json();
      const resolve = await response.meals.slice(0, limit);
      setRecomendation(resolve);
    };
    fetchDetailsRecipe();
  }, []);

  const mealsRecomendations = (item, key) => (
    <div
      data-testid={ `${key}-recomendation-card` }
    >
      <img
        src={ item.strMealThumb }
        alt={ item.strMeal }
        style={ { width: '150px' } }
      />
      <p>{ item.strCategory }</p>
      <h5 data-testid={ `${key}-recomendation-title` }>{ item.strMeal }</h5>
    </div>
  );

  return (
    recomendation.map((item, index) => (
      <div
        key={ index }
      >
        { mealsRecomendations(item, index) }
      </div>
    ))
  );
}

export default RecomendationsFoods;
