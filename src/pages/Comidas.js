import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import FoodDAPI from '../service/foodAPI';
import Buttons from '../components/categoriesButton';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  const { foodCategory, foodData, searchBar } = useContext(RecipesContext);
  FoodDAPI();
  const [food] = useState(true);
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
        <Buttons food={ food } />
        <Recipes food={ food } />
        <Footer />
      </div>
    );
  }
  return <p> Loading... </p>;
}

export default Comidas;
