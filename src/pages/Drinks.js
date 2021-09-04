import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import MyContext from '../context';
import Categories from '../components/Categories';
import fetchDrinks from '../services/Header-SearchBar/Drinks/fetchDrinks';
import searchDrinksByIngredient
  from '../services/Header-SearchBar/Drinks/searchDrinksByIngredient';

export default function Drinks() {
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
      const { drinks } = result;
      setResultList(drinks);
    };
    resolveApi();
  }, [resultList, searchBarResult]);

  useEffect(() => {
    const resolviDrink = async () => {
      if (selectedIngredient !== '') {
        const MAX_DRINKS = 12;
        const result = await searchDrinksByIngredient(selectedIngredient);
        const { drinks } = result;
        setFeed(drinks.slice(0, MAX_DRINKS));
        return true;
      }
      const MAX_FOODS = 12;
      const result = await fetchDrinks();
      const { drinks } = result;
      setFeed(drinks.slice(0, MAX_FOODS));
    };
    resolviDrink();
  }, [setFeed, feedDataFilter, selectedIngredient]);

  const renderList = () => {
    if (resultList === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (!resultList) {
      return (
        feed.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          <Link key={ Math.random() } to={ `bebidas/${idDrink}` }>
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <h2
                data-testid={ `${index}-card-name` }
              >
                {strDrink}
              </h2>
            </div>
          </Link>
        ))
      );
    }
    if (resultList.length === 1) {
      return <Redirect to={ `/bebidas/${resultList[0].idDrink}` } />;
    }
    return (
      <ul>
        {resultList.map((item, index) => {
          const MAX_ITENS = 12;
          if (index < MAX_ITENS) {
            return (
              <Link key={ item.idDrink } to={ `bebidas${item.idDrink}` }>
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
