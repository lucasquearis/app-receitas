import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import DrinksAPI from '../service/drinksAPI';
import Buttons from '../components/categoriesButton';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Bebidas() {
  const { drinkCategory, drinkData, searchBar } = useContext(RecipesContext);
  DrinksAPI();
  const [food] = useState(false);
  if (drinkData === null) {
    return (
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      && <Redirect to="/bebidas" />
    );
  }
  if (drinkData.length === 1 && searchBar === true) {
    return <Redirect to={ `/bebidas/${drinkData[0].idDrink}` } />;
  }
  if (drinkCategory.length > 0) {
    return (
      <div>
        <Header title="Bebidas" />
        <Buttons food={ food } />
        <Recipes food={ food } />
        <Footer />
      </div>
    );
  }
  return <p> Loading... </p>;
}

export default Bebidas;
