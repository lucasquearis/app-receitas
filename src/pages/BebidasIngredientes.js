import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

function BebidasIngredientes() {
  const [ingrediente] = useState(true);
  const { setSearch, setFilter, food, setFood } = useContext(RecipesContext);
  const onClick = ({ target }) => {
    setSearch('ingrediente');
    setFilter(target.parentNode.innerText);
  };
  setFood(false);
  return (
    <div>
      <Header title="Explorar Ingredientes" renderSearch={ false } />
      <Recipes food={ food } ingredientes={ ingrediente } onClick={ onClick } />
      <Footer />
    </div>
  );
}

export default BebidasIngredientes;
