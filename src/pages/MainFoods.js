import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryButtons from '../components/CategoryButtons';
import RecipeCard from '../components/RecipeCard';
import FoodContext from '../context/FoodContext';

export default function MainFoods() {
  const NUMBER_OF_RECIPES = 12;
  const { pathname } = useLocation();
  const { foods, categories } = useContext(FoodContext);

  if (foods === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (foods !== null && foods.length === 1) {
    return <Redirect to={ `comidas/${foods[0].idMeal}` } />;
  }

  return (
    <div>
      <Header title="Comidas" />
      <CategoryButtons categories={ categories } />

      <ul>
        { foods && foods.slice(0, NUMBER_OF_RECIPES)
          .map((recipe, index) => (
            <RecipeCard
              key={ index }
              recipe={ recipe }
              index={ index }
              type={ pathname }
            />
          ))}
      </ul>
      <Footer />
    </div>
  );
}
