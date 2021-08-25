import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import Header from '../../components/Header';
import BarraDeBusca from '../../components/BarraDeBusca';
import Card from '../../components/Card';
import MenuInferior from '../../components/MenuInferior';
import BarraCategorias from './BarraCategorias';

function Principal() { // Nome provisório
  const { pathname } = useLocation();
  const { mealsList, drinksList, showBar, setShowBar } = useContext(AppContext);

  const recipes = (pathname === '/comidas') ? mealsList : drinksList;
  useEffect(() => () => setShowBar(false), [setShowBar]); // willUnmount. Muda o estado G. pra false de novo ao sair de "comidas"

  return (
    <>
      <Header nomeDaPagina={ (pathname === '/comidas') ? 'Comidas' : 'Bebidas ' } />
      { showBar ? <BarraDeBusca /> : null }
      <BarraCategorias whatIsTheType={ pathname } />
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
      <MenuInferior />
    </>
  );
}

export default Principal;
