import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';
import CategoryFoodButtons from '../Components/categoryFoddButtons';
import { getAllFoodsThunk } from '../Redux/actions/categorieButtonsAct';

function FoodMainPage() {
  const { meals } = useSelector((state) => state.foodcategories);
  const dispatch = useDispatch();

  const DOZE = 12;

  useEffect(() => {
    dispatch(getAllFoodsThunk());
  }, [dispatch]);

  if (!meals) {
    return <Spinner animation="border" variant="danger" />;
  }
  console.log(meals);
  return (
    <>
      <Header title="Comidas" loading />
      <CategoryFoodButtons />
      { meals.slice(0, DOZE).map(({ idMeal, strMeal, strMealThumb }, key) => (
        <RecipeCard
          key={ key }
          id={ idMeal }
          thumbnail={ strMealThumb }
          title={ strMeal }
          index={ strMeal }
        />
      ))}
      <Footer />
    </>
  );
}

export default FoodMainPage;
