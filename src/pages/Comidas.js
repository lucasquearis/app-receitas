import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Buttons from '../components/categoriesButton';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodDAPI from '../service/foodAPI';

function Comidas() {
  const {
    foodCategory,
    foodData,
    searchBar,
    filter } = useContext(RecipesContext);
  if (filter === '') {
    FoodDAPI();
  }
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
