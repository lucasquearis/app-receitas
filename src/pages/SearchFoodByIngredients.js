import React, { useContext } from 'react';
import FooterMenu from '../components/FooterMenu';
import profileIcon from '../images/profileIcon.svg';
import FoodContext from '../context/FoodContext';
import IngredientCard from '../components/IngredientsCard';

const SearchFoodByIngredients = () => {
  const { ingredients } = useContext(FoodContext);
  const NUMBER_OF_CARDS = 12;

  return (
    <div>
      <button type="button">
        { console.log(ingredients)}
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </button>
      <p data-testid="page-title">Explorar Ingredientes</p>
      { ingredients.slice(0, NUMBER_OF_CARDS).map((ingredient, index) => (
        <IngredientCard
          key={ index }
          ingredientImg={ ingredient.strIngredient }
          ingredientName={ ingredient.strIngredient }
          index={ index }
          path="themealdb"
        />
      ))}
      <FooterMenu />
    </div>
  );
};

export default SearchFoodByIngredients;
