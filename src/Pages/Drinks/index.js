import React from 'react';
import { Redirect } from 'react-router-dom';
import SearchHeader from '../../components/SearchHeader';
import Footer from '../../components/Footer';
import { useFiltersContext } from '../../context/FiltersProvider';
import { useDataContext } from '../../context/DataProvider';

export default function Drinks() {
  // Recebendo informações do provider "useFoodAndDrinksContext"
  const { data, loading } = useDataContext();
  const { redirect } = useFiltersContext();

  // Cria os cards de bebida;
  const drinksCards = () => data.drinks
    .reduce((acc, { strDrink, idDrink, strDrinkThumb }, index) => {
      // Apenas os 12 primeiros da resposta da API (Requisito 17);
      const maxLength = 12;
      if (index < maxLength) {
        // Caso esteja entre os 12 primeiros, adicionará ao accumulator;
        acc = [
          ...acc,
          <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <h4 data-testid={ `${index}-card-name` }>{ strDrink }</h4>
          </div>,
        ];
      }
      return acc;
    }, []);

  return (
    <div>
      <SearchHeader>Bebidas</SearchHeader>
      {/* Se não estiver carregando, exibirá os cards */}
      { loading ? <h1>Loading...</h1> : drinksCards() }
      { redirect.drinks
        && data.drinks.length > 0
        && <Redirect to={ `/bebidas/${data.drinks[0].idDrink}` } /> }
      <Footer />
    </div>
  );
}
