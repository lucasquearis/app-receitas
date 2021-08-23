import React, { useEffect, useContext, useState } from 'react';
import myContext from '../context/MyContext';

function FetchFood(action, food = '') {
  // const { context } = useContext(myContext);
  // console.log(context);
  const actions = {
    procuraComida: 'search.php?s=',
    random: 'random.php',
  };

  const fetchFoods = async () => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/${actions[action]}${food}`;
    console.log(endPoint);
    const response = await fetch(endPoint);
    const resolve = await response.json();
    console.log(resolve);
  };
  fetchFoods();
  return (
    <p>carregando...</p>
  );
}

export default FetchFood;
