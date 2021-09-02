import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { requestIngredientsList } from '../redux/actions/fetchActions';
import { Header, Footer, ExploreIngredients } from '../components';
import { IngredientsBackground } from '../UI globalStyles';

function DrinkIngredients() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  useEffect(() => {
    dispatch(requestIngredientsList(path));
  });
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <IngredientsBackground>
        <ExploreIngredients path={ path } />
      </IngredientsBackground>
      <Footer />
    </div>
  );
}

export default DrinkIngredients;
