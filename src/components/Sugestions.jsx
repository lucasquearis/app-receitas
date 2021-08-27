import React, { useEffect, useState } from 'react';

function Sugestions({ type }) {
  const [sugestions, setSugestions] = useState([]);
  const urlMealsSugestions = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlDrinksSugestions = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const finalURL = type === 'meals' ? urlMealsSugestions : urlDrinksSugestions;

  useEffect(() => {
    const fetchSugestions = async () => {
      const SIX = 6;
      const response = await fetch(`${finalURL}`);
      const data = await response.json();
      const resFilter = type === 'meals' ? await data.meals.filter((item, key) => (
        key < SIX))
        : await data.drinks.filter((item, key) => (
          key < SIX));
      setSugestions(resFilter);
    };
    fetchSugestions();
  }, [finalURL]);

  const renderMealsDetails = (item) => (
    <div>
      <img
        width="150"
        height="150"
        src={ item.strMealThumb }
        alt={ item.strMeal }
      />
      <p>{ item.strCategory }</p>
      <h5>{ item.strMeal }</h5>
    </div>
  );

  const renderDrinksDetails = (item) => (
    <div>
      <img
        width="150"
        height="150"
        src={ item.strDrinkThumb }
        alt={ item.strDrink }
      />
      <p>{ item.strAlcoholic }</p>
      <h5>{ item.strDrink }</h5>
    </div>
  );

  return (
    sugestions.map((item, key) => (
      <div
        key={ key }
        data-testid={ `${key}-recomendation-card` }
      >
        {
          item.idMeal ? renderMealsDetails(item) : renderDrinksDetails(item)
        }
      </div>
    ))
  );
}

export default Sugestions;
