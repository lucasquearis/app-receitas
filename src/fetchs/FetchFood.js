import React, { useEffect, useContext, useState } from 'react';

function FetchFood() {
  const food = 'rice';
  const [data, setData] = useState([]);
  const fetchFoods = async () => {
    const endPoint = `www.themealdb.com/api/json/v1/1/search.php?s=${food}`;
    const results = await fetch(endPoint).then((resolve) => resolve.json());
    setData(results);
  };
  fetchFoods();
  console.log(data);
}

export default FetchFood;
