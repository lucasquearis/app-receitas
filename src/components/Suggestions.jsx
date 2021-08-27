import React, { useEffect, useState } from 'react';

function Sugestions({ type }) {
  const [sugestions, setSugestions] = useState([]);
  const urlMealsSugestions = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlDrinksSugestions = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const correctURL = type === 'meals' ? urlMealsSugestions : urlDrinksSugestions;

  useEffect(() => {
    const fetchSugestions = async () => {
      const request = await fetch(`${correctURL}`);
      const response = await request.json();
      const resSugestion = type === 'meals' ? await response.meals.filter((item, key) => (
        key < Number('6')))
        : await response.drinks.filter((item, key) => (
          key < Number('6')));
      setSugestions(resSugestion);
    };
    fetchSugestions();
  }, [correctURL]);

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
