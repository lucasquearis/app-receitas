import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FoodIngredientCard from '../components/FoodIngredientCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { foodIngredientsListFetch } from '../redux/actions/actionFood';

function FoodPerIngredient() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(foodIngredientsListFetch());
  }, [dispatch]);

  const foodIngredientList = useSelector(({ foodReducer }) => (
    foodReducer.foodIngredientsList));
  if (foodIngredientList === []) {
    return <p>loading...</p>;
  }
  return (
    <>
      <Header title="Explorar Ingredientes" />
      {foodIngredientList.map((item, index) => (
        <FoodIngredientCard
          key={ item.strIngredient }
          title={ item }
          index={ index }
        />
      ))}
      <Footer />
    </>
  );
}

export default FoodPerIngredient;
