import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function ExploreDrink() {
  const [apiDrink, setApiDrink] = useState([]);

  useEffect(() => {
    const getApiDrink = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const { drinks } = await response.json();
        setApiDrink(drinks);
      }
      catch (error){
        console.log(error);
      }
    };
    getApiDrink();
  },[]);

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      { apiDrink[0] && <Link to={ `/bebidas/${ apiDrink[0].idDrink }` }>
        <button data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link> }
    </div>
  );
}

export default ExploreDrink;
