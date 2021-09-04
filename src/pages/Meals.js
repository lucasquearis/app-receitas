import React, { useContext, useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import MyContext from '../context';
import Header from '../components/Header';
import Categories from '../components/Categories';
import fetchFoods from '../services/Header-SearchBar/Foods/fetchFoods';
import searchFoodsByIngredient from
  '../services/Header-SearchBar/Foods/searchFoodsByIngredient';
import './pageCSS/Meals.css';

export default function Meals() {
  const {
    feed,
    setFeed,
    searchBarResult,
    feedDataFilter,
    selectedIngredient,
  } = useContext(MyContext);
  const [resultList, setResultList] = useState();

  useEffect(() => {
    const resolveApi = async () => {
      const result = await searchBarResult;
      const { meals } = result;
      setResultList(meals);
    };
    resolveApi();
  }, [resultList, searchBarResult]);

  useEffect(() => {
    const resolviFood = async () => {
      if (selectedIngredient !== '') {
        const MAX_FOODS = 12;
        const result = await searchFoodsByIngredient(selectedIngredient);
        const { meals } = result;
        setFeed(meals.slice(0, MAX_FOODS));
        return true;
      }
      const MAX_FOODS = 12;
      const result = await fetchFoods();
      const { meals } = result;
      setFeed(meals.slice(0, MAX_FOODS));
    };
    resolviFood();
  }, [setFeed, feedDataFilter, selectedIngredient]);

  const renderList = () => {
    if (resultList === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (!resultList) {
      return (
        feed.map(({ strMeal, strMealThumb, idMeal }, index) => (
          <Link key={ Math.random() } to={ `comidas/${idMeal}` }>
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <h2
                data-testid={ `${index}-card-name` }
              >
                {strMeal}
              </h2>
            </div>
          </Link>
        ))
      );
    }
    if (resultList.length === 1) {
      return <Redirect to={ `/comidas/${resultList[0].idMeal}` } />;
    }
    return (
      <ul>
        {resultList.map((item, index) => {
          const MAX_ITENS = 12;
          if (index < MAX_ITENS) {
            return (
              <Link key={ item.idMeal } to={ `comidas/${item.idMeal}` }>
                <li
                  data-testid={ `${index}-recipe-card` }
                >
                  <h2
                    data-testid={ `${index}-card-name` }
                  >
                    {item.strMeal}
                  </h2>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                  />
                </li>
              </Link>
            );
          } return false;
        })}
      </ul>
    );
  };
  return (
    <>
      <Header title="Comidas" />
      <Categories />
      {renderList()}
      <BottomMenu />
    </>
  );
}
