import React from 'react';
import { Redirect } from 'react-router-dom';
import SearchHeader from '../../components/SearchHeader';
import Footer from '../../components/Footer';
import { useMyContext } from '../../context/MyProvider';

export default function Food() {
  const { data, redirect, loading } = useMyContext();

  const foodCards = () => data.food
    .reduce((acc, { strMeal, idMeal, strMealThumb }, index) => {
      const maxLength = 12;
      if (index < maxLength) {
        acc = [
          ...acc,
          <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
            <h4 data-testid={ `${index}-card-name` }>{ strMeal }</h4>
          </div>,
        ];
      }
      return acc;
    }, []);

  return (
    <div>
      <SearchHeader>Comidas</SearchHeader>
      { loading ? <h1>Loading...</h1> : foodCards() }
      { redirect.food
        && data.food.length > 0
        && <Redirect to={ `/comidas/${data.food[0].idMeal}` } /> }
      <Footer />
    </div>
  );
}
