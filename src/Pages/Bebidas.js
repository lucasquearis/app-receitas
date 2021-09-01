import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as BebidasAPI from '../service/BebidasAPI';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../Context/RecipesContext';

const fetchInitialDrinks = async (setBebidas) => {
  const maxDrinks = 12;
  const results = await BebidasAPI.buscarBebidaPorNome('');
  setBebidas(results.filter((result, index) => index < maxDrinks));
};

const mudaFiltro = (event, filtro, setFiltro, setBebidas) => {
  const { target: value } = event;

  if (filtro === value.innerText) {
    fetchInitialDrinks(setBebidas);
    setFiltro('');
  }
  if (value.innerText === 'All' && filtro !== 'All') {
    fetchInitialDrinks(setBebidas);
    setFiltro(value.innerText);
  }
  if (filtro !== value.innerText) {
    setFiltro(value.innerText);
  }
};

export default function Bebidas() {
  const [bebidas, setBebidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState('');

  const { recipes, recipeType } = useContext(RecipesContext);
  const TWELVE = 12;

  const fetchCategorias = async () => {
    const maxCategorias = 5;
    const botaoALL = { strCategory: 'All' };
    const results = await BebidasAPI.buscarCategorias('');
<<<<<<< HEAD
    console.log(results);
=======

    if (results[0].strCategory !== 'All') {
      results.unshift(botaoALL);
    }
>>>>>>> 1bf586a88ffc0075446acc345f2766e3055d0aca
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

  const renderRecipes = (receitas) => (
    receitas.map((receita, index) => (
      index < TWELVE
      && (
        <Link key={ receita.idDrink } to={ `/bebidas/${receita.idDrink}` }>
          <Card key={ receita.idDrink } bebida={ receita } index={ index } />
        </Link>
      )
    ))
  );

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
      { (recipes && recipeType === 'bebida')
        ? renderRecipes(recipes) : renderRecipes(bebidas)}

      <Footer />
    </section>
  );
}
