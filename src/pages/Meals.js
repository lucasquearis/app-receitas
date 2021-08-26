import React, { useContext, useState, useEffect } from 'react';
import BottomMenu from '../components/BottomMenu';
import MyContext from '../context';
import Header from '../components/Header';

export default function Meals() {
  const { searchBarResult } = useContext(MyContext);
  const [resultList, setResultList] = useState();

  useEffect(() => {
    const resolveApi = async () => {
      const result = await searchBarResult;
      const { meals } = result;
      setResultList(meals);
    };
    resolveApi();
  }, [resultList, searchBarResult]);

  const renderList = () => {
    if (!resultList) {
      return (<h1>Search something... </h1>);
    }
    return (
      <ul>
        {resultList.map((item) => (
          <li key={ item.strMeal }>
            <h2>{item.strMeal}</h2>
            <img src={ item.strMealThumb } alt={ item.strMeal } />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <Header title="Comidas" />
      {renderList()}
      <BottomMenu />
    </>
  );
}
