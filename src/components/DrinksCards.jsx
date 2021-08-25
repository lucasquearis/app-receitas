import React, { useContext } from 'react';
import Context from '../context/Context';
import DrinkCard from './DrinkCard';

export default function DrinksCards() {
  const { dataDrinks } = useContext(Context);
  const DOZE = 12;

  return (
    <ul>
      { dataDrinks ? (
        dataDrinks
          .filter((_item, index) => index < DOZE)
          .map((drink, index) => (
            <DrinkCard
              key={ drink.idDrink }
              drink={ drink }
              index={ index }
            />
          ))
      ) : null }
    </ul>
  );
}
