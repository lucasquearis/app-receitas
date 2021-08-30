import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ExploreDrinks() {
  const history = useHistory();
  const [data, setData] = useState([]);

  const changeRoute = () => {
    history.push('/explorar/bebidas/ingrediente"');
  };

  useEffect(() => {
    const getRandomDrink = async () => {
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const results = await fetch(endPoint).then((response) => response.json());
      setData(results);
    };

    getRandomDrink();
  }, []);

  return (
    <div>
      <h1>Explorar Bebidas</h1>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => changeRoute() }
      >
        Por Ingredientes
      </button>
      <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
    </div>
  );
}

export default ExploreDrinks;
