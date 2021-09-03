import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { requestIngredientsList } from '../redux/actions/fetchActions';
import { Header, Footer, ExploreIngredients, Loading } from '../components';
import { IngredientsBackground, MainBackGround } from '../UI globalStyles';

function MealIngredients() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  useEffect(() => {
    dispatch(requestIngredientsList(path));
  }, [dispatch, path]);
  const ingredients = useSelector(({ meals }) => meals.ingredients);
  if (!ingredients.meals) {
    return (
      <section>
        <Header title="Explorar Ingredientes" searchIcon />
        <MainBackGround>
          <Loading />
        </MainBackGround>
      </section>
    );
  }
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <IngredientsBackground comida>
        <ExploreIngredients path={ path } />
      </IngredientsBackground>
      <Footer />
    </div>
  );
}

export default MealIngredients;
