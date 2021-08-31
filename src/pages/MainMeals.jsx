import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { requestCategoryList } from '../redux/actions/fetchActions';
import { Header, RecipeList, Footer, CategoryFilter } from '../components';
import UseInitialRecipes from '../hook/UseInitialRecipes';
import MainBackGround from '../UI globalStyles';

function MainMeals() {
  const dispatch = useDispatch();
  const filter = useSelector(({ meals }) => meals.filter);

  useEffect(() => {
    dispatch(requestCategoryList('/comidas'));
  });

  if (filter !== 'explore') {
    UseInitialRecipes('meals');
  }
  const recipes = useSelector(({ meals }) => meals.recipes);
  if (recipes.meals && recipes.meals.length === 1 && filter === 'searchBar') {
    const mealId = recipes.meals[0].idMeal;
    return <Redirect to={ `/comidas/${mealId}` } />;
  }
  return (
    <div>
      <Header title="Comidas" searchIcon />
      <MainBackGround>
        <CategoryFilter />
        <RecipeList />
      </MainBackGround>
      <Footer />
    </div>
  );
}

export default MainMeals;
