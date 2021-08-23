import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  // DRINK_ERROR_RESPONSE,
  DRINK_RESPONSE } from '../../redux/reducers/drinkReducer';
import DrinkCard from '../DrinkCard';
import Loading from '../Loading';

const NUMBER_ELEVEN = 11;

const DrinkList = () => {
  const loading = useSelector(({ drink }) => drink.loading);
  const drinks = useSelector(({ drink }) => drink.drinks);
  const error = useSelector(({ drink }) => drink.error);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const getFirstMeals = async () => {
      // try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks: startDrinks } = await response.json();
      dispatch({ type: DRINK_RESPONSE, payload: startDrinks });
      // } catch (errorType) {
      //   console.log(`Algo deu errado na busca por bebidas: ${errorType}`);
      //   dispatch({ type: DRINK_ERROR_RESPONSE });
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

  if (!drinks) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <p>Nenhuma receita encontrada...</p>;
  }

  if (drinks.length === 1) {
    history.push(`/bebidas/${drinks[0].idDrink}`);
  }

  return (
    <div className="d-flex flex-row flex-wrap">
      {
        drinks.filter((e, index) => index <= NUMBER_ELEVEN)
          .map((drink, index) => (
            <DrinkCard key={ `${index}-card-name` } drink={ drink } index={ index } />
          ))
      }
    </div>
  );
};

export default DrinkList;
