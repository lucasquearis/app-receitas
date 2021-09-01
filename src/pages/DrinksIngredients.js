import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import profileIcon from '../images/profileIcon.svg';
import AppContext from '../context/AppContext';
import IngredientCard from '../components/IngredientsCard';
import './ingredientDrinks.css';

const DrinksIngredients = () => {
  const { ingredients } = useContext(AppContext);
  const NUMBER_OF_CARDS = 12;

  return (
    <div className="ingredient-container">
      <header>
        <Link to="/perfil">
          <button type="button">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </button>
        </Link>
        <p data-testid="page-title">Explorar Ingredientes</p>
      </header>
      <div className="ingredient-list">
        { ingredients.slice(0, NUMBER_OF_CARDS).map((ingredient, index) => (
          <IngredientCard
            key={ index }
            ingredientImg={ ingredient.strIngredient1 }
            ingredientName={ ingredient.strIngredient1 }
            index={ index }
            path="thecocktaildb"
          />
        ))}
      </div>
      <FooterMenu />
    </div>
  );
};

export default DrinksIngredients;
