import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ComidasAPI from '../service/ComidasAPI';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../Context/RecipesContext';

const fetchInitialFoods = async (setComidas) => {
  const maxFood = 12;
  const results = await ComidasAPI.buscarComidaPorNome('');
  setComidas(results.filter((result, index) => index < maxFood));
};

// Função que pega as comidas por ingredientes
const getIngredients = async (ingredientName, setComidas) => {
  const searchFoods = 12;
  const results = await ComidasAPI.buscarComidasIngrediente(ingredientName);
  const twelveRecipes = results.filter((_res, index) => index < searchFoods);
  setComidas(twelveRecipes);
};

const mudaFiltro = (event, filtro, setFiltro, setComidas) => {
  const { target: value } = event;
  if (filtro === value.innerText) {
    fetchInitialFoods(setComidas);
    setFiltro('');
  }
  if (value.innerText === 'All' && filtro !== 'All') {
    fetchInitialFoods(setComidas);
    setFiltro(value.innerText);
  }
  if (filtro !== value.innerText) {
    setFiltro(value.innerText);
  }
};

export default function Comidas() {
  const [comidas, setComidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState('');

  const { recipes, recipeType, ingredient } = useContext(RecipesContext);
  const TWELVE = 12;

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
    if (!ingredient.ing) {
      fetchInitialFoods(setComidas);
    }
    getIngredients(ingredient.nameIng, setComidas);
  }, [ingredient]);

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

  const renderRecipes = (receitas) => (
    receitas.map((receita, index) => (
      index < TWELVE
      && (
        <Link key={ receita.idMeal } to={ `/comidas/${receita.idMeal}` }>
          <Card key={ receita.idMeal } comida={ receita } index={ index } isFood />
        </Link>)
    ))
  );

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
      {(recipes && recipeType === 'comida')
        ? renderRecipes(recipes) : renderRecipes(comidas)}
      <Footer />
    </section>
  );
}
