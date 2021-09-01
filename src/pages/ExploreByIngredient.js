import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import genericFetchAPI from '../services/genericFetchAPI';
import CardIngredientFood from '../components/CardIngredientFood';
import CardIngredientDrink from '../components/CardIngredientDrink';

function ExploreByIngredient(title) {
  const history = useHistory();
  const URL = history.location.pathname;
  if (URL === '/explorar/bebidas/ingredientes'
|| URL === '/explorar/comidas/ingredientes') {
    title = 'Explorar Ingredientes';
  }

  const [foods, setFood] = useState([]);
  const [bavarages, setDrink] = useState([]);
  const { pathname } = useLocation();

  const resolveFood = async () => {
    const { meals } = await genericFetchAPI('meal', 'list', 'i', 'list');
    setFood(meals);
  };

  const resolveDrink = async () => {
    const { drinks } = await genericFetchAPI('cocktail', 'list', 'i', 'list');
    setDrink(drinks);
  };

  useEffect(() => {
    const verifyPathname = () => {
      if (pathname === '/explorar/comidas/ingredientes') {
        resolveFood();
      } else {
        resolveDrink();
      }
    };
    verifyPathname();
  }, [pathname]);

  if (foods.length || bavarages.length) {
    console.log(bavarages);
  }

  const maxList = 12;

  return (
    <div>
      <Header title={ title } hideSearch />
      {foods.map((food, index) => {
        if (index < maxList) {
          return (<CardIngredientFood key={ index } food={ food } i={ index } />);
        } return null;
      })}
      {bavarages.map((drink, index) => {
        if (index < maxList) {
          return (<CardIngredientDrink key={ index } drink={ drink } i={ index } />);
        } return null;
      })}
      <Footer />
    </div>
  );
}

export default ExploreByIngredient;
