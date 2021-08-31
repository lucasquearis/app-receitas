import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import IngredientsCard from '../components/IngredientsCard';

import Footer from '../components/Footer';

function IngredientsExploreFood() {
  const [foodIngredients, setFoodIngredients] = useState([]);
  const MAX_INGREDIENTS = 12;

  useEffect(() => {
    const listIngredients = async () => {
      try {
        const apiIngredientes = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
        );
        const { meals } = await apiIngredientes.json();
        setFoodIngredients(meals);
      } catch (error) {
        console.log(error);
      }
    };
    listIngredients();
  }, []);

  const foodImage = (name) => `https://www.themealdb.com/images/ingredients/${name}-Small.png`;

  return (
    <div>
      <Header title="Explorar Ingredientes das Comidas" />
      {foodIngredients
        .filter((_e, maxIngredient) => maxIngredient < MAX_INGREDIENTS)
        .map((ingredient, index) => (
          <IngredientsCard
            index={ index }
            key={ index }
            src={ foodImage(ingredient.strIngredient) }
            name={ ingredient.strIngredient }
          />
        ))}
      <Footer />
    </div>
  );
}

export default IngredientsExploreFood;
