import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Header, Footer } from '../components';
import * as api from '../services/api';
import AppContext from '../context/AppContext';

const drinksIngredientsImagesAPI = 'https://www.thecocktaildb.com/images/ingredients/';
const drinksIngredientsAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const DRINKS_INGREDIENT_LENGTH = 12;

const DrinksByIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const { setExpIng } = useContext(AppContext);

  useEffect(() => {
    api.getDrinks(drinksIngredientsAPI, DRINKS_INGREDIENT_LENGTH, setIngredients);
  }, []);

  const formatIngredient = (ingredient) => {
    const correctIngredient = `
    ${drinksIngredientsImagesAPI}${ingredient.strIngredient1}-Small.png`;
    return correctIngredient;
  };

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <main className="meals-cards-container">

        {
          ingredients
            ? (ingredients.map((ingredient, index) => (
              <Link
                to="/bebidas"
                key={ ingredient }
                className="drink-card-link"
                onClick={ () => setExpIng(ingredient.strIngredient1) }
              >
                <Card
                  key={ ingredient.strIngredient1 }
                  type="ingredient"
                  index={ index }
                  thumb={ formatIngredient(ingredient) }
                  name={ ingredient.strIngredient1 }
                />
              </Link>
            )))
            : ''
        }
        <Footer />
      </main>
    </>
  );
};

export default DrinksByIngredients;
