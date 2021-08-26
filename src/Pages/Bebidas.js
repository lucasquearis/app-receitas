import React, { useState, useEffect } from 'react';
import * as BebidasAPI from '../service/BebidasAPI';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function Bebidas() {
  const [bebidas, setBebidas] = useState([]);
  const fetchDrinks = async () => {
    const maxDrinks = 12;
    const results = await BebidasAPI.buscarBebidaPorNome('');
    setBebidas(results.filter((result, index) => index < maxDrinks));
  };

  useEffect(() => {
    if (bebidas.length <= 0) {
      fetchDrinks();
    }
  }, [bebidas]);

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
      { console.log(bebidas) }
      <Footer />
    </section>
  );
}
