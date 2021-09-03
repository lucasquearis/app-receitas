import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FOOD_RESPONSE, FOOD_PARAMETER_RESET } from '../../redux/reducers/foodReducer';
import { getFoodTypesList, getFoodByFilter, getFood } from '../../services/foodAPI';
import MealCard from '../MealCard';
import Loading from '../Loading';
import './style.css';

const FoodList = () => {
  const NUMBER_TWELVE = 12;
  const NUMBER_FIVE = 5;
  const loading = useSelector(({ food }) => food.loading);
  const meals = useSelector(({ food }) => food.meals);
  const error = useSelector(({ food }) => food.error);
  const redirectionParameter = useSelector(({ food }) => food.redirectedWithParameter);
  const dispatch = useDispatch();
  const [foodTypesList, setFoodTypesList] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [foodFilter, setFoodFilter] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState(meals);
  const [originalMeals, setOriginalMeals] = useState(meals);

  useEffect(() => {
    const getFirstMeals = async () => {
      const { parameter, term } = redirectionParameter;
      if (parameter === 'ingredient') {
        const mealsfilteredByIngredient = await getFood(term);
        dispatch({ type: FOOD_RESPONSE, payload: mealsfilteredByIngredient });
        setOriginalMeals(mealsfilteredByIngredient);
        setFilteredMeals(mealsfilteredByIngredient);
      } else {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const { meals: startMeals } = await response.json();
        dispatch({ type: FOOD_RESPONSE, payload: startMeals });
        setOriginalMeals(startMeals);
        setFilteredMeals(startMeals);
      }
    };
    getFirstMeals();
  }, [dispatch, redirectionParameter]);

  useEffect(() => {
    getFoodTypesList().then((list) => {
      const fiveMealTypesList = list.filter((el, index) => index < NUMBER_FIVE);
      setFoodTypesList(fiveMealTypesList);
      setLoadingList(false);
    });
  }, []);

  useEffect(() => {
    if (foodFilter) {
      const getFilteredMeals = async () => {
        const response = await getFoodByFilter(foodFilter);
        setFilteredMeals(response);
      };
      getFilteredMeals();
    }
  }, [foodFilter]);

  useEffect(() => {
    setFilteredMeals(meals);
  }, [meals]);

  useEffect(() => () => dispatch({ type: FOOD_PARAMETER_RESET }), [dispatch]);

  const clickHandler = (foodType) => {
    if (foodType === foodFilter) {
      setFoodFilter(false);
      setFilteredMeals(meals);
    } else {
      setFoodFilter(foodType);
    }
  };

  const clickHandlerAll = () => {
    setFilteredMeals(meals);
    setFoodFilter(false);
  };

  if (loading || loadingList) return <Loading />;

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <p>Algo deu errado, favor tentar novamente!</p>
      </div>
    );
  }

  if (!filteredMeals) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    setFilteredMeals(originalMeals);
    return <p>Nenhuma receita encontrada...</p>;
  }

  if (filteredMeals.length === 1 && !foodFilter) {
    return <Redirect to={ `/comidas/${filteredMeals[0].idMeal}` } />;
  }

  return (
    <>
      <div className="buttons-filter">
        <Button
          data-testid="All-category-filter"
          size="lg"
          onClick={ clickHandlerAll }
        >
          All
        </Button>
        {
          foodTypesList.map((foodType, index) => (
            <Button
              key={ index }
              data-testid={ `${foodType}-category-filter` }
              size="lg"
              onClick={ () => clickHandler(foodType) }
            >
              { foodType }
            </Button>
          ))
        }
      </div>
      <div className="d-flex flex-row flex-wrap">
        {
          filteredMeals.filter((e, index) => index < NUMBER_TWELVE)
            .map((meal, index) => (
              <MealCard
                key={ `${index}-card-name` }
                // data-testid={ `${index}-recipe-card` }
                meal={ meal }
                index={ index }
              />
            ))
        }
      </div>
    </>
  );
};

export default FoodList;
