import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as BebidasAPI from '../service/BebidasAPI';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function Bebidas() {
  const [bebidas, setBebidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const fetchDrinks = async () => {
    const maxDrinks = 12;
    const results = await BebidasAPI.buscarBebidaPorNome('');
    setBebidas(results.filter((result, index) => index < maxDrinks));
  };
  const fetchCategorias = async () => {
    const maxCategorias = 6;
    const botaoALL = { strCategory: 'All' };
    const results = await BebidasAPI.buscarCategorias('');
    results.unshift(botaoALL);
    const myCategories = results.filter((result, index) => index < maxCategorias);
    setCategorias(myCategories);
  };

  useEffect(() => {
    if (bebidas.length <= 0) {
      fetchDrinks();
    }
  }, [bebidas]);
  useEffect(() => {
    if (categorias.length <= 0) {
      fetchCategorias();
    }
  }, [categorias]);

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
      <section>
        {
          categorias.map(
            (categoria, key) => (
              <button
                key={ key }
                type="button"
                data-testid={ `${categoria.strCategory}-category-filter` }
              >
                { categoria.strCategory }
              </button>
            ),
          )
        }
      </section>
      {
        bebidas.map(
          (bebida, index) => (
            <Link key={ bebida.idDrink } to={ `/bebidas/${bebida.idDrink}` }>
              <Card key={ bebida.idDrink } bebida={ bebida } index={ index } />
            </Link>
          ),
        )
      }
      { console.log(bebidas) }
      <Footer />
    </section>
  );
}
