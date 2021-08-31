import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import genericFetchAPI from '../services/genericFetchAPI';

function ExploreByIngredient() {
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

  // useEffect(() => {
  //   const pathnameIngredient = () => {
  //     if (pathname === '/explorar/comidas/ingredientes') {
  //       setState({
  //         mealOrCocktail: 'meal',
  //         type: 'list',
  //         start: 'f',
  //         search: 'list',
  //       });
  //     } else {
  //       setState({
  //         mealOrCocktail: 'cocktail',
  //         type: 'list',
  //         start: 'f',
  //         search: 'list',
  //       });
  //     }
  //   };
  //   pathnameIngredient();
  // }, [pathname]);

  // if (state.mealOrCocktail.length) {
  //   const { mealOrCocktail, type, start, search } = state;
  //   const fecthIngredient = async () => {
  //     const response = await genericFetchAPI(mealOrCocktail, type, start, search);
  //     setData({ response });
  //   };
  //   fecthIngredient();
    // return fecthIngredient();
  // }
  // return <p>Loading ...</p>;

  // if (pathname === '/explorar/comidas/ingredientes') {
  //   console.log(data);
  // } else {
  //   console.log(data);
  // }
  return (
    <div>
      <p>Explore by Ingredient</p>
      {

      }
      <Footer />
    </div>
  );
}

export default ExploreByIngredient;
