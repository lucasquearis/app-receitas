import React, { useEffect, useState } from 'react';
import Button from '../Button';
import './index.css';

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
    <div className="explo-food-container">

      <Button
        link="/explorar/comidas/ingredientes"
        testId="explore-by-ingredient"
        type="button"
        name="Por Ingredientes"
      />

      <Button
        link="/explorar/comidas/area"
        className="myButton"
        testId="explore-by-area"
        type="button"
        name="Por Local de Origem"
      />

      <Button
        link={ `/comidas/${idMeal}` }
        className="myButton2"
        testId="explore-surprise"
        type="button"
        name="Me Surpreenda!"
      />

    </div>
  );
}

export default ExploreFood;
