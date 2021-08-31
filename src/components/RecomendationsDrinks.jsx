import React, { useEffect, useState } from 'react';

function RecomendationsDrinks() {
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const limit = 6;

    const fetchDetailsRecipe = async () => {
      const request = await fetch(`${urlDrinks}`);
      const response = await request.json();
      const resolve = await response.drinks.slice(0, limit);
      setRecomendation(resolve);
    };
    fetchDetailsRecipe();
  }, []);

  const drinksRecomendations = (item, key) => (
    <div
      data-testid={ `${key}-recomendation-card` }
    >
      <img
        src={ item.strDrinkThumb }
        alt={ item.strDrink }
        style={ { width: '175px' } }
      />
      <p>{ item.strAlcoholic }</p>
      <h5 data-testid={ `${key}-recomendation-title` }>{ item.strDrink }</h5>
    </div>
  );

  return (
    recomendation.map((item, index) => (
      <div
        key={ index }
      >
        { drinksRecomendations(item, index)}
      </div>
    ))
  );
}

export default RecomendationsDrinks;
