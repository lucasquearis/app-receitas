import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';
import DrinkCard from './DrinkCard';
import { useFetchApiDrinks } from '../customHooks/useFetchApi';

export default function DrinksCards() {
  const { dataDrinks, searchDataDrinks } = useContext(Context);
  const [getDrinksApi] = useFetchApiDrinks();
  const DOZE = 12;
  const UM = 1;

  useEffect(() => { getDrinksApi(); }, []);

  if (searchDataDrinks.length === UM) {
    return <Redirect to={ `/bebidas/${searchDataDrinks[0].idDrink}` } />;
  }

  const selectData = (principalDrinks, searchDrinks) => {
    if (searchDataDrinks <= UM) {
      const data = principalDrinks;
      return data;
    }
    const data = searchDrinks;
    return data;
  };

  return (
    <ul>
      { dataDrinks ? (
        selectData(dataDrinks, searchDataDrinks)
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
