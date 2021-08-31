import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodIngredientCard from '../components/FoodIngredientCard';
import { fetchFoodsByIngredient } from '../services/foodsAPI';
import AppContext from '../context/AppContext';

function FoodIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { setFoods } = useContext(AppContext);
  const TWELVE = 12;

  useEffect(() => {
    const fetchFoodsIngredient = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(endpoint);
      const responseJSON = await response.json();
      const result12 = responseJSON.meals.slice(0, TWELVE);
      setIngredients(result12);
    };
    fetchFoodsIngredient();
  }, []);

  const handleClick = async (ingredient) => {
    const foods = await fetchFoodsByIngredient(ingredient);
    console.log(foods);
    setFoods(foods.slice(0, TWELVE));
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/comidas" />;
  }

  return (
    <div>
      <Header name="Explorar Ingredientes" />
      {
        ingredients.map((ingredient, index) => (
          <FoodIngredientCard
            key={ ingredient.idIngredient }
            ingredients={ ingredient }
            index={ index }
            onClick={ () => { handleClick(ingredient.strIngredient); } }
          />))
      }
      <Footer />
    </div>
  );
}

export default FoodIngredients;
