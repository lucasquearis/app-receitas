import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { requestCategoryList } from '../redux/actions/fetchActions';
import { Header, RecipeList, Footer, CategoryFilter, Loading } from '../components';
import UseInitialRecipes from '../hook/UseInitialRecipes';
import { MainBackGround } from '../UI globalStyles';

function MainDrinks() {
  const dispatch = useDispatch();
  const filter = useSelector(({ meals }) => meals.filter);

  useEffect(() => {
    dispatch(requestCategoryList('/bebidas'));
  });

  if (filter !== 'explore') {
    UseInitialRecipes('drinks');
  }
  const recipes = useSelector(({ meals }) => meals.recipes);
  if (recipes.drinks && recipes.drinks.length === 1 && filter === 'searchBar') {
    const drinkId = recipes.drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${drinkId}` } />;
  }
  if (!recipes.drinks) {
    return (
      <div>
        <Header title="Comidas" searchIcon />
        <MainBackGround>
          <Loading />
        </MainBackGround>
      </div>
    );
  }
  return (
    <div>
      <Header title="Bebidas" searchIcon />
      <MainBackGround>
        <CategoryFilter />
        <RecipeList />
      </MainBackGround>
      <Footer />
    </div>
  );
}

export default MainDrinks;
