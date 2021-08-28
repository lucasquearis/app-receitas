import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import MyContext from '../context';
import Card from '../components/Card';
import fetchDrinks from '../services/Header-SearchBar/Drinks/fetchDrinks';
import Categories from '../components/Categories';

export default function Drinks() {
  const { feed, setFeed, searchBarResult } = useContext(MyContext);
  const [resultList, setResultList] = useState();

  useEffect(() => {
    const resolveApi = async () => {
      const result = await searchBarResult;
      const { drinks } = result;
      setResultList(drinks);
    };
    resolveApi();
  }, [resultList, searchBarResult]);

  useEffect(() => {
    const resolviDrink = async () => {
      const MAX_FOODS = 12;
      const result = await fetchDrinks();
      const { drinks } = result;
      setFeed(drinks.slice(0, MAX_FOODS));
    };
    resolviDrink();
  }, [setFeed]);

  const renderList = () => {
    if (resultList === null) {
      console.log('ENTROU NA CONDICAO');
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (!resultList) {
      return (<h1>Search something... </h1>);
    } if (resultList.length === 1) {
      console.log(resultList[0]);
      return <Redirect to={ `/bebidas/${resultList[0].idDrink}` } />;
    }
    if (resultList.length === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    return (
      <ul>
        {resultList.map((item, index) => {
          const MAX_ITENS = 12;
          if (index < MAX_ITENS) {
            return (
              <li
                key={ item.strDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <h2
                  data-testid={ `${index}-card-name` }
                >
                  {item.strDrink}
                </h2>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
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
      <Header title="Bebidas" />
      <Categories />
      {renderList()}
      { feed.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
        <Card
          key={ idDrink }
          idType={ idDrink }
          id={ index }
          strThumb={ strDrinkThumb }
          str={ strDrink }
        />
      ))}
      <BottomMenu />
    </>
  );
}
