import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Suggestions({ type }) {
  const [suggestions, setSuggestions] = useState([]);
  const urlMealsSuggestions = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlDrinksSuggestions = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const responsiveCarousel = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1024, min: 0 },
      items: 2,
    },
  };

  const correctURL = type === 'bebidas' ? urlMealsSuggestions : urlDrinksSuggestions;

  useEffect(() => {
    const fetchSuggestions = async () => {
      const request = await fetch(`${correctURL}`);
      const response = await request.json();
      const resSuggestion = type === 'bebidas'
        ? await response.meals.filter((item, key) => (
          key < Number('6')))
        : await response.drinks.filter((item, key) => (
          key < Number('6')));
      setSuggestions(resSuggestion);
    };
    fetchSuggestions();
  }, [correctURL, type]);

  const renderMealsDetails = (item, key) => (
    <div
      key={ key }
      data-testid={ `${key}-recomendation-card` }
      className="suggestion__card"
    >
      <img
        width="150"
        height="150"
        src={ item.strMealThumb }
        alt={ item.strMeal }
      />
      <p>{ item.strCategory }</p>
      <h5 data-testid={ `${key}-recomendation-title` }>{ item.strMeal }</h5>
    </div>
  );

  const renderDrinksDetails = (item, key) => (
    <div
      key={ key }
      data-testid={ `${key}-recomendation-card` }
      className="suggestion__card"
    >
      <img
        width="150"
        height="150"
        src={ item.strDrinkThumb }
        alt={ item.strDrink }
      />
      <p>{ item.strAlcoholic }</p>
      <h5 data-testid={ `${key}-recomendation-title` }>{ item.strDrink }</h5>
    </div>
  );

  return (
    <Carousel responsive={ responsiveCarousel }>
      { suggestions.map((item, key) => (
        item.idMeal ? renderMealsDetails(item, key) : renderDrinksDetails(item, key)
      )) }
    </Carousel>
  );
}

Suggestions.propTypes = {
  type: string,
}.isRequired;

export default Suggestions;
