import React, { useEffect, useState, useContext } from 'react';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import MyContext from '../context';

export default function Drinks() {
  const { searchBarResult } = useContext(MyContext);
  const [resultList, setResultList] = useState();

  useEffect(() => {
    const resolveApi = async () => {
      const result = await searchBarResult;
      const { drinks } = result;
      setResultList(drinks);
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
          <li key={ item.strDrink }>
            <h2>{item.strDrink}</h2>
            <img src={ item.strDrinkThumb } alt={ item.strDrink } />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <Header title="Bebidas" />
      {renderList()}
      <BottomMenu />
    </>
  );
}
