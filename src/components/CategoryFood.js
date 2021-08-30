import React, { useEffect, useState } from 'react';
import CardFood from './CardFood';

function CategoryFood() {
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [category, setCategory] = useState('');
  const maxCategories = 5;
  const maxList = 12;

  useEffect(() => {
    const getFood = async () => {
      const foodApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`;
      const { meals } = await fetch(foodApi).then((data) => data.json());
      setFoodRecipes(meals);
    };

    const getCategories = async () => {
      const foodApiCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const { meals } = await fetch(foodApiCategories).then((data) => data.json());
      setFoodCategories(meals);
    };

    getFood();
    getCategories();
  }, [category]);

  const categoriesBtn = () => {
    const categoryBtn = foodCategories.slice(0, maxCategories).map(({ strCategory }) => (
      <button
        data-testid={ `${strCategory}-category-filter` }
        type="button"
        key={ strCategory }
        onClick={ (() => (
          (category !== strCategory) ? setCategory(strCategory) : setCategory(''))) }
      >
        { strCategory }
      </button>
    ));
    return categoryBtn;
  };

  return (
    <div>
      <div>
        <button type="button" onClick={ (() => setCategory('')) }>
          All
        </button>
        { categoriesBtn() }
      </div>
      <div>
        { foodRecipes.slice(0, maxList).map((meal, index) => (
          <CardFood key={ meal.idMeal } meal={ meal } i={ index } />)) }
      </div>
    </div>
  );
}

export default CategoryFood;
