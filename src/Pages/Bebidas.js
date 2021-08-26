import React, { useState } from 'react';
import * as BebidasAPI from '../service/BebidasAPI';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Bebidas() {
  const [bebidas, setBebidas] = useState([]);
  const fetchFoods = async () => {
    const maxFood = 12;
    const results = await BebidasAPI.buscarBebidaPorNome('');
    const comidasFiltered = results.filter((result, index) => index < maxFood);
    setBebidas(comidasFiltered);
  };

  fetchFoods();
  if (bebidas.length <= 0) {
    return (
      <section>
        <Header title="Bebidas" searchIcon />
        <p>Loading...</p>
        <Footer />
      </section>
    );
  }

  return (
    <section>
      <Header title="Bebidas" searchIcon />
      {
        bebidas.map(
          (bebida, index) => (
            <Card key={ bebida.idDrink } bebida={ bebida } index={ index } />
          ),
        )
      }
      <Footer />
    </section>
  );
}
