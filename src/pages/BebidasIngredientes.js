import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

function ComidasIngredientes() {
  const [food] = useState(false);
  const [ingrediente] = useState(true);
  const { setSearch, setFilter } = useContext(RecipesContext);
  const onClick = ({ target }) => {
    console.log();
    setSearch('ingrediente');
    setFilter(target.parentNode.innerText);
  };
  return (
    <div>
      <Header title="Explorar Ingredientes" renderSearch={ false } />
      <Recipes food={ food } ingredientes={ ingrediente } onClick={ onClick } />
      <Footer />
    </div>
  );
}

export default ComidasIngredientes;
