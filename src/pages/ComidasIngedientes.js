import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

function ComidasIngredientes() {
  const { setSearch, setFilter, food } = useContext(RecipesContext);
  const onClick = ({ target }) => {
    setSearch('ingrediente');
    setFilter(target.parentNode.innerText);
  };
  return (
    <div>
      <Header title="Explorar Ingredientes" renderSearch={ false } />
      <Recipes food={ food } ingredientes onClick={ onClick } />
      <Footer />
    </div>
  );
}

export default ComidasIngredientes;
