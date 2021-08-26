import React, { useEffect, useState } from 'react';
import * as BebidasAPI from '../service/BebidasAPI';

export default function DetalheBebida() {
  const [drink, setDrink] = useState({});

  useEffect(() => {
    const getDrink = async () => {
      const testID = '11007';

      const drinkResult = await BebidasAPI.buscarBebidaPeloID(testID);
      setDrink(drinkResult.drinks[0]);

      const ingredientsKeys = Object.entries(
        drinkResult.drinks[0],
      ).filter((ingredient) => (
        ingredient[0].includes('strIngredient')
      ));

      const ingredientsMeasure = Object.entries(
        drinkResult.drinks[0],
      ).filter((measureAll) => (
        measureAll[0].includes('strMeasure')
      ));

      const ingredients = ingredientsKeys.filter((key) => (
        key[1] !== '' && key[1] !== null
      ));

      const measure = ingredientsMeasure.filter((currMeasure) => (
        currMeasure[1] !== '' && currMeasure[1] !== null
      ));

      const readyIngredients = ingredients.map((ingredient, index) => {
        if (index <= measure.length - 1) {
          const currMeasure = measure[index][1];
          return `- ${ingredient[1]} - ${currMeasure}`;
        }
        return `- ${ingredient[1]}`;
      });

      console.log(readyIngredients);
    };

    getDrink();
  }, []);

  console.log(drink);

  return (
    <section>
      Oi
    </section>
  );
}
