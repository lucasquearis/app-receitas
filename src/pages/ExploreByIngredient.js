import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import genericFetchAPI from '../services/genericFetchAPI';

function ExploreByIngredient(title) {
  const history = useHistory();
  const URL = history.location.pathname;
  if (URL === '/explorar/bebidas/ingredientes'
|| URL === '/explorar/comidas/ingredientes') {
    title = 'Explorar Ingredientes';
  }
    
  const [state, setState] = useState({
    mealOrCocktail: '',
    type: '',
    start: '',
    search: '',
  });
  const [dataFood, setDataFood] = useState({});
  const [dataDrink, setDataDrinks] = useState({});
  const { pathname } = useLocation();
  const resolveFood = async () => {
    const response = await genericFetchAPI('meal', 'list', 'f', 'list');
    setDataFood({ response });
  };
  if (pathname === '/explorar/comidas/ingredientes') {
    resolveFood();
  }
  const resolveDrinks = async () => {
    const response = await genericFetchAPI('cocktail', 'list', 'f', 'list');
    setDataDrinks({ response });
  };
  if (pathname === '/explorar/bebidas/ingredientes') {
    resolveDrinks();
  }

return (
    <div>
      <Header title={ title } hideSearch />
      <p>Explore by Ingredient</p>
      {

      }
      <Footer />
    </div>
  );
}

export default ExploreByIngredient;
