import React, { useEffect, useState } from 'react';
import Button from '../Button';
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
      <Header title="Explorar" />
      <div className="container">

        <Button
          link="/explorar/bebidas/ingredientes"
          className="myButton"
          testId="explore-by-ingredient"
          type="button"
          name="Por Ingredientes"
        />

        <Button
          link={ `/bebidas/${idDrink}` }
          className="myButton2"
          testId="explore-surprise"
          type="button"
          name="Me Surpreenda!"
        />

      </div>
    </section>
  );
}

export default ExploreDrink;
