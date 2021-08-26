import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { requestIngredientsList } from '../redux/actions/fetchActions';
import { Header, Footer, ExploreIngredients } from '../components';

function DrinkIngredients() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  useEffect(() => {
    dispatch(requestIngredientsList(path));
  });
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <ExploreIngredients path={ path } />
      <Footer />
    </div>
  );
}

export default DrinkIngredients;
