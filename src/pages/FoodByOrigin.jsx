import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';

function FoodByOrigin() {
  const [origin, setOrigin] = useState('All');
  const [areaList, setAreaList] = useState([]);
  const [mealsList, setMealsList] = useState([]);
  const DOZE = 12;

  useEffect(() => {
    const allFilter = {
      strArea: 'All',
    };
    const getArea = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const Area = await fetch(url)
        .then((response) => response.json())
        .then((data) => data.meals);
      setAreaList([allFilter, ...Area]);
    };
    getArea();
  }, []);

  useEffect(() => {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${origin}`;
    if (origin === 'All') {
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }
    const getMeals = async () => {
      const meals = await fetch(url)
        .then((response) => response.json())
        .then((data) => data.meals);
      setMealsList(meals);
    };
    getMeals();
  }, [origin]);

  const handleChange = (event) => {
    setOrigin(event.target.value);
  };

  const renderDropdown = () => (
    <form>
      <select
        labelId="area-dropdown"
        data-testid="explore-by-area-dropdown"
        value={ origin }
        onChange={ handleChange }
      >
        {areaList.map(({ strArea }) => (
          <option
            key={ strArea }
            value={ strArea }
            data-testid={ `${strArea}-option` }
          >
            {strArea}
          </option>
        ))}
      </select>
    </form>
  );

  const renderCardList = () => (
    <ul>
      {mealsList.slice(0, DOZE).map((food, index) => (
        <FoodCard key={ food.idMeal } food={ food } index={ index } />
      ))}
    </ul>
  );

  return (
    <div>
      <Header name="Explorar Origem" />
      {renderDropdown()}
      {origin && renderCardList()}
      <Footer />
    </div>
  );
}

export default FoodByOrigin;
