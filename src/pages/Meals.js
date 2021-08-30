import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import MyContext from '../context';
import Header from '../components/Header';
import Card from '../components/Card';
import fetchFoods from '../services/Header-SearchBar/Foods/fetchFoods';
import Categories from '../components/Categories';
import './pageCSS/Meals.css';

export default function Meals() {
  const { feed, setFeed, searchBarResult, feedDataFilter } = useContext(MyContext);
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
      const MAX_FOODS = 12;
      const result = await fetchFoods();
      const { meals } = result;
      setFeed(meals.slice(0, MAX_FOODS));
    };
    resolviFood();
  }, [setFeed, feedDataFilter]);

  const renderList = () => {
    if (resultList === null) {
      console.log('ENTROU NA CONDICAO');
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (!resultList) {
      return (<h1>Search something... </h1>);
    }
    if (resultList.length === 1) {
      // console.log(resultList[0]);
      return <Redirect to={ `/comidas/${resultList[0].idMeal}` } />;
    }
    return (
      <ul>
        {resultList.map((item, index) => {
          const MAX_ITENS = 12;
          if (index < MAX_ITENS) {
            return (
              <li
                key={ item.strMeal }
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
      { feed.map(({ strMealThumb, strMeal, idMeal }, index) => (
        <Card
          key={ idMeal }
          idType={ idMeal }
          id={ index }
          strThumb={ strMealThumb }
          str={ strMeal }
        />
      ))}
      {renderList()}
      <BottomMenu />
    </>
  );
}
