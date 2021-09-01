import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrinkIngredientCard from '../components/DrinkIngredientCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { drinkIngredientsListFetch } from '../redux/actions/actionDrink';

function DrinkPerIngredient() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(drinkIngredientsListFetch());
  }, [dispatch]);

  const drinkIngredientsList = useSelector(({ drinkReducer }) => (
    drinkReducer.drinkIngredientsList));

  if (drinkIngredientsList === []) {
    return <p>loading...</p>;
  }
  return (
    <>
      <Header title="Explorar Ingredientes" />
      {drinkIngredientsList.map((item, index) => (
        <DrinkIngredientCard
          key={ item.strIngredient1 }
          title={ item }
          index={ index }
        />
      ))}
      <Footer />
    </>
  );
}

export default DrinkPerIngredient;
