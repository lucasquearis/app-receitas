import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { DRINK_RESPONSE } from '../../redux/reducers/drinkReducer';
import DrinkCard from '../DrinkCard';
import { getDrinkTypesList, getDrinkByFilter } from '../../services/drinkAPI';
import Loading from '../Loading';

const DrinkList = () => {
  const TWELVE = 12;
  const FIVE = 5;
  const loading = useSelector(({ drink }) => drink.loading);
  const drinks = useSelector(({ drink }) => drink.drinks);
  const error = useSelector(({ drink }) => drink.error);
  const dispatch = useDispatch();
  const [drinkTypesList, setDrinkTypesList] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [drinkFilter, setDrinkFilter] = useState(false);
  const [filteredDrinks, setFilteredDrinks] = useState(drinks);
  const [originalDrinks, setOriginalDrinks] = useState(drinks);

  useEffect(() => {
    const getFirstMeals = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks: startDrinks } = await response.json();
      dispatch({ type: DRINK_RESPONSE, payload: startDrinks });
      setFilteredDrinks(startDrinks);
      setOriginalDrinks(startDrinks);
    };
    getFirstMeals();
  }, [dispatch]);

  useEffect(() => {
    getDrinkTypesList().then((list) => {
      const reducedList = list.filter((el, index) => index < FIVE);
      setDrinkTypesList(reducedList);
      setLoadingList(false);
    });
  }, []);

  useEffect(() => {
    if (drinkFilter) {
      const getFilteredDrinks = async () => {
        const response = await getDrinkByFilter(drinkFilter);
        setFilteredDrinks(response);
      };
      getFilteredDrinks();
    }
  }, [drinkFilter]);

  useEffect(() => {
    setFilteredDrinks(drinks);
  }, [drinks]);

  const clickHandler = (drinkType) => {
    if (drinkType === drinkFilter) {
      setDrinkFilter(false);
      setFilteredDrinks(drinks);
    } else {
      setDrinkFilter(drinkType);
    }
  };

  const clickHandlerAll = () => {
    setFilteredDrinks(drinks);
    setDrinkFilter(false);
  };

  if (loading || loadingList) return <Loading />;

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <p>Algo deu errado, favor tentar novamente!</p>
      </div>
    );
  }

  if (!filteredDrinks) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    setFilteredDrinks(originalDrinks);
    return <p>Nenhuma receita encontrada...</p>;
  }

  if (filteredDrinks.length === 1 && !drinkFilter) {
    return <Redirect to={ `/bebidas/${filteredDrinks[0].idDrink}` } />;
  }

  return (
    <>
      <div>
        <Button
          data-testid="All-category-filter"
          size="lg"
          onClick={ clickHandlerAll }
        >
          All
        </Button>
        {
          drinkTypesList.map((drinkType, index) => (
            <Button
              key={ index }
              data-testid={ `${drinkType}-category-filter` }
              size="lg"
              onClick={ () => clickHandler(drinkType) }
            >
              { drinkType }
            </Button>
          ))
        }
      </div>
      <div className="d-flex flex-row flex-wrap">
        {
          filteredDrinks.filter((e, index) => index < TWELVE)
            .map((drink, index) => (
              <DrinkCard
                key={ `${index}-card-name` }
                drink={ drink }
                index={ index }
              />
            ))
        }
      </div>
    </>
  );
};

export default DrinkList;
