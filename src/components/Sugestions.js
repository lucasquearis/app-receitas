import React, { useEffect, useState } from 'react';
import '../styles/Sugestion.css';

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

  const renderMealsDetails = (item, key) => (
    <div
      data-testid={ `${key}-recomendation-card` }
      className="sugestions-imagem-container"
    >
      <img
        className="sugestions-imagem"
        src={ item.strMealThumb }
        alt={ item.strMeal }
      />
      <p>{ item.strCategory }</p>
      <h5 data-testid={ `${key}-recomendation-title` }>{ item.strMeal }</h5>
    </div>
  );

  const renderDrinksDetails = (item, key) => (
    <div
      data-testid={ `${key}-recomendation-card` }
      className="sugestions-imagem-container"
    >
      <img
        className="sugestions-imagem"
        src={ item.strDrinkThumb }
        alt={ item.strDrink }
      />
      <p>{ item.strAlcoholic }</p>
      <h5 data-testid={ `${key}-recomendation-title` }>{ item.strDrink }</h5>
    </div>
  );

  return (
    sugestions.map((item, key) => (
      <div
        className="sugestions-container"
        key={ key }
      >
        {
          item.idMeal ? renderMealsDetails(item, key) : renderDrinksDetails(item, key)
        }
      </div>
    ))
  );
}

export default Sugestions;
