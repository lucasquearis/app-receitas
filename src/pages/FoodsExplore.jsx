import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const [surpriseId, setSurpriseId] = useState(0);

  const surpriseFoodFetch = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const result = await fetch(URL);
    const resultJSON = await result.json();
    setSurpriseId(resultJSON.meals[0].idMeal);
  };

  useEffect(() => {
    surpriseFoodFetch();
  }, []);

  return (
    <div>
      <Header name="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <Button data-testid="explore-by-ingredient">
          Por Ingredientes
        </Button>
      </Link>
      <Link to="/explorar/comidas/area">
        <Button data-testid="explore-by-area">
          Por Local de Origem
        </Button>
      </Link>
      <Link to={ `/comidas/${surpriseId}` }>
        <Button data-testid="explore-surprise">
          Me Surpreenda!
        </Button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
