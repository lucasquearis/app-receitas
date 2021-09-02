import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import Buttons from '../components/categoriesButton';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  const {
    foodCategory,
    foodData,
    searchBar,
    food,
    setFood,
    ingredient,
    setIngredient } = useContext(RecipesContext);

  useEffect(() => {
    if (!food) {
      setFood(true);
    } if (ingredient) {
      setIngredient(false);
    }
  }, [food, ingredient, setFood, setIngredient]);

  if (foodData === null) {
    return (
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      && <Redirect to="/bebidas" />
    );
  }
  if (foodData.length === 1 && searchBar === true) {
    return <Redirect to={ `/comidas/${foodData[0].idMeal}` } />;
  }
  if (foodCategory.length > 0) {
    return (
      <div>
        <Header title="Comidas" />
        <Buttons food />
        <Recipes food ingredientes={ false } />
        <Footer />
      </div>
    );
  }
  return <p> Loading... </p>;
}

export default Comidas;
