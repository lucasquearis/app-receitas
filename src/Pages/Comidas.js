import React, { useState } from 'react';
import * as ComidasAPI from '../service/ComidasAPI';
import Card from '../Components/Card';

export default function Comidas() {
  const [comidas, setComidas] = useState([]);
  const fetchFoods = async () => {
    const maxFood = 12;
    const results = await ComidasAPI.buscarTodasComidasPorLetra('b');
    const comidasFiltered = results.filter((result, index) => index < maxFood);
    setComidas(comidasFiltered);
  };

  fetchFoods();
  if (comidas.length <= 0) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      {
        comidas.map(
          (comida, index) => (
            <Card key={ comida.idMeal } comida={ comida } index={ index } isFood />
          ),
        )
      }
    </section>
  );
}