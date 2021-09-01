import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderSearchBar from '../components/HeaderSearchBar';
import genericFetchAPI from '../services/genericFetchAPI';
import MainContext from '../context/MainContext';
import CardDrink from '../components/CardDrink';
import CardFood from '../components/CardFood';

function RecipeList(title) {
  const { ingredient } = useContext(MainContext);
  const [ingredientFoodList, setIngredientFoodList] = useState([]);
  const [ingredientDrinkList, setIngredientDrinkList] = useState([]);
  const history = useHistory();
  const URL = history.location.pathname;
  const maxList = 12;
  
  if (URL === '/comidas') {
    title = 'Comidas';
  } else if (URL === '/bebidas') {
    title = 'Bebidas';
  }

  const resolveIngredientFood = async () => {
    const ingredientFood = await genericFetchAPI('meal', 'filter', 'i', ingredient);
    setIngredientFoodList(ingredientFood);
  };

  const resolveIngredientDrink = async () => {
    const ingredientDrink = await genericFetchAPI('cocktail', 'filter', 'i', ingredient);
    setIngredientDrinkList(ingredientDrink);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      console.log(data);
    };
    
    fetchAPI();
  }, []);
  
  useEffect(() => {
    if (URL === '/comidas' && ingredient) {
      resolveIngredientFood();
    } else (URL === '/bebidas' && ingredient) {
      resolveIngredientDrink();
    }
  }, [URL, ingredient]);
  
  return (
    <div>
      <Header title={ title } />
      <HeaderSearchBar />
      {ingredientFoodList.map((food, index) => {
        if (index < maxList) {
          return (<CardFood key={ index } meal={ food } i={ index } />);
        } return null;
      })}
      {ingredientDrinkList.map((drink, index) => {
        if (index < maxList) {
          return (<CardDrink key={ index } drink={ drink } i={ index } />);
        } return null;
      })}
      <Footer />
    </div>
  );
}

export default RecipeList;
