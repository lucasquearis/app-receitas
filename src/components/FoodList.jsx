import React, { useEffect, useState, useCallback } from 'react';
import FoodCard from './FoodCard';
import ButtonCategories from './ButtonCategories';
import '../styles/FoodList.css'

function FoodList() {
  const [foods, setFoods] = useState('');
  const [categories, setCategories] = useState('');
  const [toggle, setToggle] = useState(false);
  const [press, setPress] = useState('');
  const DOZE = 12;
  const CINCO = 5;
  const fetchFoods = useCallback(async () => {
    const endpointFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(endpointFoods);
    const response = await request.json();
    setFoods(response);
  }, []);

  const fetchCategories = useCallback(async () => {
    const endpointCategoryFood = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const requestCat = await fetch(endpointCategoryFood);
    const responseCat = await requestCat.json();
    setCategories(responseCat);
  }, []);

  const fetchCategoryFood = useCallback(async (value) => {
    const endpointCategoryFood = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
    const requestCatFoods = await fetch(endpointCategoryFood);
    const responseCatFoods = await requestCatFoods.json();
    setFoods(responseCatFoods);
  }, []);

  const handleClick = (target) => {
    if (toggle === false) {
      setPress(target.value);
      fetchCategoryFood(target.value);
      setToggle(true);
    } else if (press === target.value) {
      fetchFoods();
      setToggle(false);
    } else {
      fetchCategoryFood(target.value);
      setToggle(true);
    }
  };

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, [fetchFoods, fetchCategories]);

  if (foods !== '' && categories !== '') {
    return (
      <div>
        <div className="category-btn-container">
          <ButtonCategories
            handleClick={ fetchFoods }
            dataID="All-category-filter"
            value="All"
          />
          {categories.meals.slice(0, CINCO).map((cat) => (<ButtonCategories
            key={ cat.idMeal }
            handleClick={ handleClick }
            dataID={ `${cat.strCategory}-category-filter` }
            value={ cat.strCategory }
          />))}
        </div>
        <ol className="foodcard-container">
          {foods.meals.slice(0, DOZE).map((food, index) => (
            <FoodCard key={ food.idMeal } food={ food } index={ index } />
          ))}
        </ol>
      </div>
    );
  } return (
    <div>
      Loading...
    </div>
  );
}
export default FoodList;
