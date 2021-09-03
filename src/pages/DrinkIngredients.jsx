import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { requestIngredientsList } from '../redux/actions/fetchActions';
import { Header, Footer, ExploreIngredients, Loading } from '../components';
import { IngredientsBackground, MainBackGround } from '../UI globalStyles';

function DrinkIngredients() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  useEffect(() => {
    dispatch(requestIngredientsList(path));
  }, [dispatch, path]);
  const ingredients = useSelector(({ meals }) => meals.ingredients);
  if (!ingredients.drinks) {
    return (
      <section>
        <Header title="Explorar Ingredientes" />
        <MainBackGround>
          <Loading />
        </MainBackGround>
      </section>
    );
  }
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
