import React, { useEffect, useState } from 'react';
import { Card } from '../components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const mealsAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MAX_LENGTH = 12;

const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getMeals = async () => {
      let mealsResult = await fetch(mealsAPI).then((response) => response.json());
      mealsResult = mealsResult.meals;
      mealsResult = mealsResult.slice(0, MAX_LENGTH);
      setMeals(mealsResult);
    };
    getMeals();
  }, []);

  console.log(meals);

  return (
    <div className="meals-container">
      <Header />
      { meals.map((meal, index) => (
        <Card
          key={ meal.idMeal }
          type="Meal"
          index={ index }
          thumb={ meal.strMealThumb }
          name={ meal.strMeal }
        />
      ))}
      <Footer />
    </div>
  );
};

export default Meals;
