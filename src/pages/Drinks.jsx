import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Drinks() {
  const [data, setData] = useState([]);
  const reduxState = useSelector((state) => state.cocktail);

  useEffect(() => {
    setData(reduxState.data);
  }, [reduxState.data]);

  return (
    <section>
      <Header pageTitle="Bebidas" />
      {/* {data
        .map(({ strDrinkThumb, strDrink, idDrink }, index) => (
          <Card
            index={ index }
            key={ idDrink }
            cardImg={ strDrinkThumb }
            cardName={ strDrink }
          />
        ))} */}
    </section>
  );
}
