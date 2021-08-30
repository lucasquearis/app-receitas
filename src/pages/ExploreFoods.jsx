import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ExploreFoods() {
  const history = useHistory();
  const [data, setData] = useState([]);

  const changeRoute = () => {
    history.push('/explorar/comidas/ingredientes');
  };

  const changeRoute1 = () => {
    history.push('/explorar/comidas/area');
  };

  useEffect(() => {
    const getRandomFood = async () => {
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const results = await fetch(endPoint).then((response) => response.json());
      setData(results);
    };

    getRandomFood();
  }, []);

  return (
    <div>
      <h1>Explorar Comidas</h1>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => changeRoute() }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => changeRoute1() }
      >
        Por Local de Origem
      </button>
      <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
    </div>
  );
}

export default ExploreFoods;
