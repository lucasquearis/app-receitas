import React, { useEffect, useState } from 'react';
// import RecipeCard from '../Components/RecipeCard';

function FoodIngredientesExplore() {
  const [ingredient, setIngredient] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getIngredient = async () => {
      const END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(END_POINT);
      const { meals } = await response.json();
      setData(meals);
      const ingredientMap = data.map(({ strIngredient }) => strIngredient);
      setIngredient(ingredientMap);
    };
    getIngredient();
  }, [setIngredient]);

  return (
    <>
      { console.log(ingredient) }
      {/* <RecipeCard /> */}
    </>
  );
}

export default FoodIngredientesExplore;
