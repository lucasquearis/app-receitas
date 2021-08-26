import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryButtons from '../components/CategoryButtons';
import RecipeCard from '../components/RecipeCard';
import DrinkContext from '../context/DrinkContext';

export default function MainDrinks() {
  const NUMBER_OF_RECIPES = 12;
  const { pathname } = useLocation();
  const { drinks, categories } = useContext(DrinkContext);

  if (drinks === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (drinks !== null && drinks.length === 1) {
    return <Redirect to={ `bebidas/${drinks[0].idDrink}` } />;
  }

  return (
    <>
      <Header title="Bebidas" icon="true" />
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
      <Footer />
    </>
  );
}
