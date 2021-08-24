import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';
import RecipeCard from '../components/RecipeCard';
import DrinkContext from '../context/DrinkContext';

export default function MainDrinks() {
  const NUMBER_OF_RECIPES = 12;
  const { pathname } = useLocation();
  const { drinks, categories } = useContext(DrinkContext);

  return (
    <>
      <Header title="Bebidas" />
      <CategoryButtons categories={ categories } />

      <ul>
        {drinks && drinks.slice(0, NUMBER_OF_RECIPES)
          .map((recipe, index) => (
            <RecipeCard
              key={ index }
              recipe={ recipe }
              index={ index }
              type={ pathname }
            />
          ))}
      </ul>
    </>
  );
}
