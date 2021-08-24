import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  // FOOD_ERROR_RESPONSE,
  FOOD_RESPONSE } from '../../redux/reducers/foodReducer';
import MealCard from '../MealCard';
import Loading from '../Loading';

const NUMBER_ELEVEN = 11;

const FoodList = () => {
  const loading = useSelector(({ food }) => food.loading);
  const meals = useSelector(({ food }) => food.meals);
  const error = useSelector(({ food }) => food.error);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const getFirstMeals = async () => {
      // try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals: startMeals } = await response.json();
      dispatch({ type: FOOD_RESPONSE, payload: startMeals });
      // } catch (errorType) {
      //   console.log(`Algo deu errado na busca por pratos: ${errorType}`);
      //   dispatch({ type: FOOD_ERROR_RESPONSE });
      // }
    };
    getFirstMeals();
  }, [dispatch]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <p>Algo deu errado, favor tentar novamente!</p>
      </div>
    );
  }

  if (!meals) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <p>Nenhuma receita encontrada...</p>;
  }

  if (meals.length === 1) {
    history.push(`/comidas/${meals[0].idMeal}`);
  }

  return (
    <div className="d-flex flex-row flex-wrap">
      {
        meals.filter((e, index) => index <= NUMBER_ELEVEN)
          .map((meal, index) => (
            <MealCard key={ `${index}-card-name` } meal={ meal } index={ index } />
          ))
      }
    </div>
  );
};

export default FoodList;
