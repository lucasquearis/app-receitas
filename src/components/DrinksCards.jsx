import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import DrinkCard from './DrinkCard';
import { useFetchApiDrinks } from '../customHooks/useFetchApi';

export default function DrinksCards() {
  const { dataDrinks } = useContext(Context);
  const [getDrinksApi] = useFetchApiDrinks();
  const DOZE = 12;

  useEffect(() => { getDrinksApi(); }, []);

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
