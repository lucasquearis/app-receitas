import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header';
import AppContext from '../../context/AppContext';
import Card from '../../Components/Card';

function Principal() { // Nome provisório
  const { pathname } = useLocation();
  const { mealsList, drinksList } = useContext(AppContext);

  const recipes = (pathname === '/comidas') ? mealsList : drinksList;

  return (
    <>
      <Header nomeDaPagina={ (pathname === '/comidas') ? 'Comidas' : 'Bebidas ' } />
      {
        recipes.map((recipe, index) => {
          const type = (pathname === '/comidas') ? 'Meal' : 'Drink';
          return (
            <Card
              img={ recipe[`str${type}Thumb`] }
              index={ index }
              key={ `${type}-card-${index}` }
              name={ recipe[`str${type}`] }
            />
          );
        })
      }
    </>
  );
}

export default Principal;
