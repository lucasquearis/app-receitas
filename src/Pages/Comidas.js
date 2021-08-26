import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ComidasAPI from '../service/ComidasAPI';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function Comidas() {
  const [comidas, setComidas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const fetchFoods = async () => {
    const maxFood = 12;
    const results = await ComidasAPI.buscarComidaPorNome('');
    setComidas(results.filter((result, index) => index < maxFood));
  };
  const fetchCategorias = async () => {
    const maxCategorias = 6;
    const botaoALL = { strCategory: 'All' };
    const results = await ComidasAPI.buscarCategorias('');
    results.unshift(botaoALL);
    const myCategories = results.filter((result, index) => index < maxCategorias);
    setCategorias(myCategories);
  };
  useEffect(() => {
    if (comidas.length <= 0) {
      fetchFoods();
    }
  }, [comidas]);
  useEffect(() => {
    if (categorias.length <= 0) {
      fetchCategorias();
    }
  }, [categorias]);

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
        comidas.map(
          (comida, index) => (
            <Link key={ comida.idMeal } to={ `/comidas/${comida.idMeal}` }>
              <Card key={ comida.idMeal } comida={ comida } index={ index } isFood />
            </Link>
          ),
        )
      }
      { console.log('comidas:', comidas) }
      { console.log('categorias:', categorias) }
      <Footer />
    </section>
  );
}
