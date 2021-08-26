import React, { useState, useEffect } from 'react';
import * as ComidasAPI from '../service/ComidasAPI';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function Comidas() {
  const [comidas, setComidas] = useState([]);
  const fetchFoods = async () => {
    const maxFood = 12;
    const results = await ComidasAPI.buscarComidaPorNome('');
    setComidas(results.filter((result, index) => index < maxFood));
  };
  useEffect(() => {
    if (comidas.length <= 0) {
      fetchFoods();
    }
  }, [comidas]);

  // fetchFoods();
  if (comidas.length <= 0) {
    return (
      <section>
        <Header title="Comidas" searchIcon />
        <p>Loading...</p>
        <Footer />
      </section>
    );
  }

  return (
    <section>
      <Header title="Comidas" searchIcon />
      {
        comidas.map(
          (comida, index) => (
            <Card key={ comida.idMeal } comida={ comida } index={ index } isFood />
          ),
        )
      }
      { console.log(comidas) }
      <Footer />
    </section>
  );
}
