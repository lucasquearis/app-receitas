import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

function ExploreFoodByOrigin() {
  const [foods, setFoods] = useState([]);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState('');

  useEffect(() => {
    const apiAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const apiFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
    const areasResult = async () => {
      const data = await fetch(apiAreas).then((response) => response.json());
      setAreas(...data.meals);
    };
    const foodsResult = async () => {
      const data = await fetch(apiFoods).then((response) => response.json());
      setFoods(...data.meals);
    };
    areasResult();
    foodsResult();
  }, [setAreas, setFoods]);

  useEffect(() => {
    setFoods([]);
    if (area === 'All') {
      const api = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
      const foodsResult = async () => {
        const data = await fetch(api).then((response) => response.json());
        setFoods(...data.meals);
      };
      foodsResult();
    }
    const api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    const foodsResult = async () => {
      const data = await fetch(api).then((response) => response.json());
      setFoods(...data.meals);
    };
    foodsResult();
  }, [area, setFoods]);

  if (foods.length === 0) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    
  );
}

export default ExploreFoodByOrigin;
