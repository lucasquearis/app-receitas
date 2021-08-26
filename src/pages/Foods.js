import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import FoodFilterButton from '../components/FoodFilterButton';
import Context from '../context/Context';

function Foods() {
  const { foodRecipes,
    requestCategory,
    setFoodRecipes,
    setFoodCategories,
    foodCategoryAPI } = useContext(Context);
  const { loading: loadcard } = foodRecipes;
  const { list: recipes } = foodRecipes;

  useEffect(() => {
    if (loadcard) {
      requestCategory('https://www.themealdb.com/api/json/v1/1/search.php?s=', setFoodRecipes);
      requestCategory(foodCategoryAPI, setFoodCategories);
    }
  });

  const cards = [];
  const maxCards = 12;
  for (let index = 0; index < maxCards; index += 1) {
    if (loadcard === false) {
      cards.push(<FoodCard meal={ recipes.meals[index] } index={ index } />);
    }
  }

  const foodPage = (bool) => {
    if (bool === false) {
      return (
        <div>
          <Header title="Comidas" name="meal" search />
          <FoodFilterButton />
          { cards }
        </div>
      );
    }
  };

  return (
    <main>
      { foodPage(loadcard) }
    </main>
  );
}

export default Foods;
