import React, { useState, useEffect } from 'react';
import { getFoodIngredients } from '../../services/foodAPI';
import ExploreByIngredientsCard from '../ExploreByIngredientsCard';
import Loading from '../Loading';
import './style.css';

const MealsIngredientsExplore = () => {
  const [ingredients, setIngredients] = useState([]);
  const MAX_INGREDIENTS = 12;

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await getFoodIngredients();
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
          tag="meal"
          index={ index }
        />)) }
    </div>
  );
};

export default MealsIngredientsExplore;
