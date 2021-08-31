import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as BebidasAPI from '../service/BebidasAPI';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const fetchInitialDrinks = async (setBebidas) => {
  const maxDrinks = 12;
  const results = await BebidasAPI.buscarBebidaPorNome('');
  setBebidas(results.filter((result, index) => index < maxDrinks));
};

const mudaFiltro = (event, filtro, setFiltro, setBebidas) => {
  const { target: value } = event;
  console.log(value.innerText);
  if (filtro === value.innerText) {
    fetchInitialDrinks(setBebidas);
    setFiltro('');
    // document.getElementById(`${value}-category-filter`).disabled = false;
  }
  if (value.innerText === 'All' && filtro !== 'All') {
    fetchInitialDrinks(setBebidas);
    setFiltro(value.innerText);
    // document.getElementById(`${value}-category-filter`).disabled = true;
  }
  if (filtro !== value.innerText) {
    setFiltro(value.innerText);
    // document.getElementById(`${value}-category-filter`).disabled = true;
  }
};

export default function Bebidas() {
  const [bebidas, setBebidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState('');
  // const fetchDrinks = async () => {
  //   const maxDrinks = 12;
  //   const results = await BebidasAPI.buscarBebidaPorNome('');
  //   setBebidas(results.filter((result, index) => index < maxDrinks));
  // };
  const fetchCategorias = async () => {
    const maxCategorias = 5;
    const botaoALL = { strCategory: 'All' };
    const results = await BebidasAPI.buscarCategorias('');
    console.log(results);
    const myCategories = results.filter(
      (result, index) => index < maxCategorias,
    );
    if (myCategories[0].strCategory !== 'All') {
      myCategories.unshift(botaoALL);
    }
    setCategorias(myCategories);
  };

  useEffect(() => {
    if (bebidas.length <= 0) {
      fetchInitialDrinks(setBebidas);
    }
  }, [bebidas]);
  useEffect(() => {
    if (categorias.length <= 0) {
      fetchCategorias();
    }
  }, [categorias]);
  useEffect(() => {
    const fetchFilteredDrinks = async () => {
      const maxFood = 12;
      const results = await BebidasAPI.buscarBebidasPorCategoria(filtro);
      setBebidas(results.filter((result, index) => index < maxFood));
    };
    if (filtro.length > 0 && filtro !== 'All') {
      fetchFilteredDrinks();
    }
  }, [filtro]);

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
                id={ `${categoria.strCategory}-category-filter` }
                onClick={ (event) => mudaFiltro(event, filtro, setFiltro, setBebidas) }
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
