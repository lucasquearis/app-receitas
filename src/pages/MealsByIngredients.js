import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Header, Footer } from '../components';
import * as api from '../services/api';
import AppContext from '../context/AppContext';
import './css/ExploreByIngredients.css';

const mealsIngredientsImagesAPI = 'https://www.themealdb.com/images/ingredients/';
const mealsIngredientsAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const MEALS_INGREDIENT_LENGTH = 12;

const MealsByIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const { setExpIng } = useContext(AppContext);

  useEffect(() => {
    api.getMeals(mealsIngredientsAPI, MEALS_INGREDIENT_LENGTH, setIngredients);
  }, []);

  const formatIngredient = (ingredient) => {
    const correctIngredient = `
    ${mealsIngredientsImagesAPI}${ingredient.strIngredient}-Small.png`;
    return correctIngredient;
  };

  return (
    <div className="ingredients-container">
      <Header title="Explorar Ingredientes" />
      <div className="ingredients-cards-container">
        {
          ingredients
            ? (ingredients.map((ingredient, index) => (
              <Link
                to="/comidas"
                key={ ingredient }
                className="ingredients-card-link"
                onClick={ () => setExpIng(ingredient.strIngredient) }
              >
                <Card
                  key={ ingredient.strIngredient }
                  type="ingredient"
                  index={ index }
                  thumb={ formatIngredient(ingredient) }
                  name={ ingredient.strIngredient }
                />
              </Link>
            )))
            : ''
        }
      </div>
      <Footer />
    </div>
  );
};

export default MealsByIngredients;
