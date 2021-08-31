import React, { useEffect, useState } from 'react';
import IngredientsCard from './IngredientsCard';

function ExploreFoodByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const exploreLimits = 12;

  const fetchIngredients = async () => {
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(endPoint);
    return response.json();
  };

  useEffect(() => {
    fetchIngredients().then((response) => {
      setIngredients(response.meals);
    });
  }, []);

  return (
    <div>
      <h1 data-testid="page-title">Explorar Ingredientes</h1>
      { ingredients.slice(0, exploreLimits).map((ingredient, index) => (
        <IngredientsCard
          key={ index }
          ingredientImg={ ingredient.strIngredient }
          ingredientName={ ingredient.strIngredient }
          index={ index }
          path="themealdb"
        />
      ))}
    </div>
  );
}

export default ExploreFoodByIngredients;
