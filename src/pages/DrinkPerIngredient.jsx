import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrinkIngredientCard from '../components/DrinkIngredientCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { drinkIngredientsListFetch } from '../redux/actions/actionDrink';
import './FoodCards.css';
import './Explore.css';

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
      <div className="fix-top map-cards">
        {drinkIngredientsList.map((item, index) => (
          <DrinkIngredientCard
            key={ item.strIngredient1 }
            title={ item }
            index={ index }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default DrinkPerIngredient;
