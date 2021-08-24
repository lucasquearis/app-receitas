import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import {
  getDataByIngredient,
  getDataByName,
  getDataByFirstLetter,
} from '../services/api';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Foods() {
  const [data, setData] = useState([]);
  const [filterIngredient, setFilterIngredient] = useState(false);
  const [filterName, setFilterName] = useState(false);
  const [filterFirstLetter, setFilterFirstLetter] = useState(false);

  const location = useLocation();
  const currentPage = location.pathname;

  useEffect(() => {
    if (filterIngredient && !filterName && !filterFirstLetter) {
      getDataByIngredient(inputValue)
        .then((response) => setData(response));
    } else if (filterName && !filterIngredient && !filterFirstLetter) {
      getDataByName(inputValue)
        .then((response) => setData(response.meals));
    } else if (filterFirstLetter && !filterIngredient && !filterName) {
      getDataByFirstLetter(inputValue)
        .then((response) => setData(response));
    }
  }, [filterIngredient, filterName, filterFirstLetter, currentPage]);

  return (
    <section>
      <Header pageTitle="Comidas" />
      {/* {data
        .map(({ strMealThumb, strMeal, idMeal }, index) => (
          <Card
            index={ index }
            key={ idMeal }
            cardImg={ strMealThumb }
            cardName={ strMeal }
          />
        ))} */}
      {data.length === 1
        ? (
          data.map(({ idMeal, idDrink }) => (
            currentPage === foodPage ? (
              <Redirect key={ idMeal } to={ `/comidas/${idMeal}` } />
            ) : (
              <Redirect key={ idMeal } to={ `/bebidas/${idDrink}` } />
            )))
        ) : null}
    </section>
  );
}
