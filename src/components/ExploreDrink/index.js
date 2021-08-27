import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../Header';

function ExploreDrink() {
  async function getRandomDrink() {
    const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json());
    return drinks[0];
  }

  const [idDrink, setIdDrink] = useState('');

  function randomDrink() {
    getRandomDrink().then((response) => {
      setIdDrink(response.idDrink);
    });
  }

  useEffect(() => {
    randomDrink();
  });

  return (
    <section>
      <Header>Explorar Bebidas</Header>
      <div className="container">
        <Link to="/explorar/bebidas/ingredientes">
          <Button
            className="myButton"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Link to={ `/bebidas/${idDrink}` }>
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

export default ExploreDrink;
