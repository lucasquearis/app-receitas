import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import Buttons from '../components/categoriesButton';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Bebidas() {
  const {
    drinkCategory,
    drinkData,
    searchBar,
    setFood,
    food,
    ingredient,
    setIngredient } = useContext(RecipesContext);

  useEffect(() => {
    if (food) {
      setFood(false);
    } if (ingredient) {
      setIngredient(false);
    }
  }, [food, ingredient, setFood, setIngredient]);

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
        <Buttons food={ false } />
        <Recipes food={ false } ingredientes={ false } />
        <Footer />
      </div>
    );
  }
  return <p> Loading... </p>;
}

export default Bebidas;
