import React from 'react';
import { Redirect } from 'react-router-dom';
import SearchHeader from '../../components/SearchHeader';
import Footer from '../../components/Footer';
import { useMyContext } from '../../context/MyProvider';

export default function Drinks() {
  const { data, redirect, loading } = useMyContext();

  const drinksCards = () => data.drinks
    .reduce((acc, { strDrink, idDrink, strDrinkThumb }, index) => {
      const maxLength = 12;
      if (index < maxLength) {
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
      { loading ? <h1>Loading...</h1> : drinksCards() }
      { redirect.drinks
        && data.drinks.length > 0
        && <Redirect to={ `/bebidas/${data.drinks[0].idDrink}` } /> }
      <Footer />
    </div>
  );
}
