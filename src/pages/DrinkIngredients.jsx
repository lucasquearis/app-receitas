import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkIngredientCard from '../components/DrinkIngredientCard';
import { fetchDrinksByIngredient } from '../services/drinksAPI';
import AppContext from '../context/AppContext';

function DrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { setDrinks } = useContext(AppContext);
  const TWELVE = 12;

  useEffect(() => {
    const fetchFoodsIngredient = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(endpoint);
      const responseJSON = await response.json();
      const result12 = responseJSON.drinks.slice(0, TWELVE);
      setIngredients(result12);
    };
    fetchFoodsIngredient();
  }, []);

  const handleClick = async (ingredient) => {
    const drinks = await fetchDrinksByIngredient(ingredient);
    setDrinks(drinks.slice(0, TWELVE));
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/bebidas" />;
  }

  return (
    <div>
      <Header name="Explorar Ingredientes" />
      {
        ingredients.map((ingredient, index) => (
          <DrinkIngredientCard
            key={ ingredient.strIngredient1 }
            ingredients={ ingredient }
            index={ index }
            onClick={ () => handleClick(ingredient.strIngredient1) }
          />))
      }
      <Footer />
    </div>
  );
}

export default DrinksIngredients;
