import React, { useState, useEffect } from 'react';
import { getDrinkIngredients } from '../../services/drinkAPI';
import ExploreByIngredientsCard from '../ExploreByIngredientsCard';
import Loading from '../Loading';
import './style.css';

const DrinksIngredientsExplore = () => {
  const [ingredients, setIngredients] = useState([]);
  const MAX_INGREDIENTS = 12;

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await getDrinkIngredients();
      const filteredResponse = response
        .filter((_ingredient, num) => num < MAX_INGREDIENTS);
      setIngredients(filteredResponse);
    };
    fetchIngredients();
  }, []);

  if (ingredients.length === 0) return <Loading />;

  return (
    <div className="ingredient-cards-container">
      { ingredients.map((ingredient, index) => (
        <ExploreByIngredientsCard
          key={ `ingredient-${index}` }
          ingredient={ ingredient }
          tag="cocktail"
          index={ index }
        />)) }
    </div>
  );
};

export default DrinksIngredientsExplore;
