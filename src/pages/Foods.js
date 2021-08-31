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
  const INITIAL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [API, setAPI] = useState(INITIAL_API);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    requestCategory(API, setFoodRecipes);
    requestCategory(foodCategoryAPI, setFoodCategories);
  }, [API]);

  if (loading) return <p> carregando ...</p>;

  const cards = [];
  const maxCards = 11;
  for (let index = 0; index < list.meals.length; index += 1) {
    cards.push(<FoodCard meal={ list.meals[index] } index={ index } />);
  }

  const handleClick = ({ target: { innerText } }) => {
    if (filter === innerText || innerText === 'All') {
      setFilter('All');
      return setAPI(INITIAL_API);
    }
    setAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${innerText}`);
    setFilter(innerText);
    setFoodRecipes({ ...foodRecipes, loading: true });
  };

  const foodPage = (bool) => {
    if (bool === false) {
      return (
        <div>
          <Header title="Comidas" name="meal" search />
          <FoodFilterButton onClick={ handleClick } toggle={ filter } />
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
