import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../context/AppContext';
import DrinkList from '../components/DrinkList';
import Footer from '../components/Footer';
import '../styles/Main.css'

function MainDrinks() {
  const { drinks } = useContext(AppContext);
  return (
    <div>
      { drinks.length === 1
        && <Redirect to={ `/bebidas/${drinks[0].idDrink}` } /> }
      <Header name="Bebidas" />
      <div className="foodcard-container">
        { drinks.length !== 0 ? drinks.map((recipe, index) => (
          <div key={ recipe.idDrink }>
            <Link to={ `/bebidas/${recipe.idDrink}` }>
              <RecipeCard recipe={ recipe } index={ index } />
            </Link>
          </div>
        )) : <DrinkList /> }
      </div>
      <Footer />
    </div>
  );
}

export default MainDrinks;
