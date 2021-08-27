import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../Header';

function ExploreFood() {
  async function getRandomMeal() {
    const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json());
    return meals[0];
  }

  const [idMeal, setIdMeal] = useState('');

  function randomMeal() {
    getRandomMeal().then((response) => {
      setIdMeal(response.idMeal);
    });
  }

  useEffect(() => {
    randomMeal();
  });

  return (
    <section>
      <Header>Explorar Comidas</Header>
      <div className="container">
        <Link to="/explorar/comidas/ingredientes">
          <Button
            className="myButton btn-lg btn-warning"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Link to="/explorar/comidas/area">
          <Button
            className="myButton"
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
          </Button>
        </Link>
        <Link to={ `/comidas/${idMeal}` }>
          <Button
            className="myButton2"
            data-testid="explore-surprise"
            type="button"
          >
            Me Surpreenda!
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default ExploreFood;
