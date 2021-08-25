import React from 'react';
import { Redirect } from 'react-router-dom';
import SearchHeader from '../../components/SearchHeader';
import Footer from '../../components/Footer';
import { useFoodAndDrinksContext } from '../../context/FoodAndDrinksProvider';

export default function Food() {
  // Recebendo informações do provider "useFoodAndDrinksContext"
  const { data, redirect, loading } = useFoodAndDrinksContext();

  // Cria os cards de comida;
  const foodCards = () => data.food
    .reduce((acc, { strMeal, idMeal, strMealThumb }, index) => {
      // Apenas os 12 primeiros da resposta da API (Requisito 17);
      const maxLength = 12;
      if (index < maxLength) {
        // Caso esteja entre os 12 primeiros, adicionará ao accumulator;
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
      {/* Se não estiver carregando, exibirá os cards */}
      { loading ? <h1>Loading...</h1> : foodCards() }
      { redirect.food
        && data.food.length > 0
        && <Redirect to={ `/comidas/${data.food[0].idMeal}` } /> }
      <Footer />
    </div>
  );
}
