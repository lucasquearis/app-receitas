import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import MyContext from '../context';
import Card from '../components/Card';
import Categories from '../components/Categories';
import fetchDrinks from '../services/Header-SearchBar/Drinks/fetchDrinks';

export default function Drinks() {
  const { feed, setFeed, searchBarResult, feedDataFilter } = useContext(MyContext);
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
  }, [setFeed, feedDataFilter]);

  const renderList = () => {
    if (resultList === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (!resultList) {
      return (
        feed.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
          <Card
            key={ idDrink }
            idType={ idDrink }
            id={ index }
            strThumb={ strDrinkThumb }
            str={ strDrink }
          />
        ))
      );
    } if (resultList.length === 1) {
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
              <Link key={ item.idDrink } to={ `bebidas/${item.idDrink}` }>
                <li
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
              </Link>
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
      <BottomMenu />
    </>
  );
}
