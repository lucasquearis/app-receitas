import React, { useState } from 'react';
import buscarTodasBebidasPorLetra from '../service/BebidasAPI';
import Card from '../Components/Card';

export default function Bebidas() {
  const [bebidas, setBebidas] = useState([]);
  const fetchFoods = async () => {
    const maxFood = 12;
    const results = await buscarTodasBebidasPorLetra('b');
    const comidasFiltered = results.filter((result, index) => index < maxFood);
    setBebidas(comidasFiltered);
  };

  fetchFoods();
  if (bebidas.length <= 0) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      {
        bebidas.map(
          (bebida, index) => (
            <Card key={ bebida.idDrink } bebida={ bebida } index={ index } />
          ),
        )
      }
    </section>
  );
}
