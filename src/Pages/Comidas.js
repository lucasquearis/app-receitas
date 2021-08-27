import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ComidasAPI from '../service/ComidasAPI';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const fetchInitialFoods = async (setComidas) => {
  const maxFood = 12;
  const results = await ComidasAPI.buscarComidaPorNome('');
  setComidas(results.filter((result, index) => index < maxFood));
};

const mudaFiltro = (event, filtro, setFiltro, setComidas) => {
  const { target: value } = event;
  console.log(value.innerText);
  if (filtro === value.innerText) {
    fetchInitialFoods(setComidas);
    setFiltro('');
    // document.getElementById(`${value}-category-filter`).disabled = false;
  }
  if (value.innerText === 'All' && filtro !== 'All') {
    fetchInitialFoods(setComidas);
    setFiltro(value.innerText);
    // document.getElementById(`${value}-category-filter`).disabled = true;
  }
  if (filtro !== value.innerText) {
    setFiltro(value.innerText);
    // document.getElementById(`${value}-category-filter`).disabled = true;
  }
};

export default function Comidas() {
  const [comidas, setComidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState('');

  // const fetchInitialFoods = async () => {
  //   const maxFood = 12;
  //   const results = await ComidasAPI.buscarComidaPorNome('');
  //   setComidas(results.filter((result, index) => index < maxFood));
  // };
  const fetchCategorias = async () => {
    const maxCategorias = 6;
    const botaoALL = { strCategory: 'All' };
    const results = await ComidasAPI.buscarCategorias('');
    if (results[0].strCategory !== 'All') {
      results.unshift(botaoALL);
    }
    const myCategories = results.filter(
      (result, index) => index < maxCategorias,
    );
    setCategorias(myCategories);
  };
  useEffect(() => {
    if (comidas.length <= 0) {
      fetchInitialFoods(setComidas);
    }
  }, [comidas]);
  useEffect(() => {
    if (categorias.length <= 0) {
      fetchCategorias();
    }
  }, [categorias]);
  useEffect(() => {
    const fetchFilteredFoods = async () => {
      const maxFood = 12;
      const results = await ComidasAPI.buscarComidasPorCategoria(filtro);
      setComidas(results.filter((result, index) => index < maxFood));
    };
    if (filtro.length > 0 && filtro !== 'All') {
      fetchFilteredFoods();
    }
  }, [filtro]);

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
                id={ `${categoria.strCategory}-category-filter` }
                onClick={ (event) => mudaFiltro(event, filtro, setFiltro, setComidas) }
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
