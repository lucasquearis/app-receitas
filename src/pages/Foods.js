import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import Recipes from '../components/Recipes';
import FoodCard from '../components/FoodCard';
import FoodFilterButton from '../components/FoodFilterButton';
import Context from '../context/Context';

function Foods() {
  const { foodRecipes,
    requestCategory,
    setFoodRecipes,
    setFoodCategories,
    foodCategoryAPI } = useContext(Context);
  const { loading } = foodRecipes;
  const { list } = foodRecipes;
  const [API, setAPI] = useState('https://www.themealdb.com/api/json/v1/1/search.php?s=');

  useEffect(() => {
    if (loading) {
      requestCategory(API, setFoodRecipes);
      requestCategory(foodCategoryAPI, setFoodCategories);
    }
  }, [API]);

  if (loading) return <p> carregando ...</p>;

  const cards = [];
  const maxCards = 11;
  for (let index = 0; index < list.meals.length; index += 1) {
    cards.push(<FoodCard meal={ list.meals[index] } index={ index } />);
  }

  const handleClick = async ({ target: { innerText } }) => {
    setFoodRecipes({ ...foodRecipes, loading: true });
    setAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${innerText}`);
  };

  const foodPage = (bool) => {
    if (bool === false) {
      return (
        <div>
          <Header title="Comidas" name="meal" search />
          <FoodFilterButton onClick={ handleClick } />
          { console.log(list) }
          { cards.filter((e, index) => index <= maxCards) }
          <Recipes />
          <MenuInferior />
        </div>
      );
    }
  };

  return (
    <main>
      { foodPage(loading) }
    </main>
  );
}

export default Foods;
