import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

function BebidasIngredientes() {
  const { setSearch,
    setFilter,
    food,
    setFood,
    ingredient,
    setIngredient } = useContext(RecipesContext);
  const onClick = ({ target }) => {
    setSearch('ingrediente');
    setFilter(target.parentNode.innerText);
  };

  useEffect(() => {
    if (food) {
      setFood(false);
    } if (!ingredient) {
      setIngredient(true);
    }
  }, [food, ingredient, setFood, setIngredient]);

  return (
    <div>
      <Header title="Explorar Ingredientes" renderSearch={ false } />
      <Recipes food={ food } ingredientes onClick={ onClick } />
      <Footer />
    </div>
  );
}

export default BebidasIngredientes;
