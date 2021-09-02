import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

function BebidasIngredientes() {
  const { setSearch, setFilter } = useContext(RecipesContext);
  const onClick = ({ target }) => {
    setSearch('ingrediente');
    setFilter(target.parentNode.innerText);
  };
  return (
    <div>
      <Header title="Explorar Ingredientes" renderSearch={ false } />
      <main className="ingredients-container">
        <Recipes food={ false } ingredientes onClick={ onClick } />
      </main>
      <Footer />
    </div>
  );
}

export default BebidasIngredientes;
