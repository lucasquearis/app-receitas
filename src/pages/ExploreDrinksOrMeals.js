import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function ExploreDrinksOrMeals(title) {
  const history = useHistory();
  const URL = history.location.pathname;
  if (URL === '/explorar/bebidas') {
    title = 'Explorar Bebidas';
  } if (URL === '/explorar/comidas') {
    title = 'Explorar Comidas';
  }
  return (
    <div>
      <Header title={ title } hideSearch />
      <p>Explore Drinks or Meals</p>
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

function ExploreDrinksOrMeals() {
  const [randomFood, setRandomFood] = useState('');
  const [randomDrink, setRandomDrink] = useState('');
  const [buttonFood, setButtonFood] = useState(false);
  const [buttonDrink, setButtonDrink] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    function handleClickFood() {
      const fecthRandomFood = async () => {
        const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
        const require = await fetch(URL);
        const response = await require.json();
        const id = response.meals[0].idMeal;
        setRandomFood(id);
      };
      fecthRandomFood();
    }
    handleClickFood();
  }, [buttonFood]);

  useEffect(() => {
    function handleClickDrink() {
      const fecthRandomDrink = async () => {
        const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        const require = await fetch(URL);
        const response = await require.json();
        const id = response.drinks[0].idDrink;
        setRandomDrink(id);
      };
      fecthRandomDrink();
    }
    handleClickDrink();
  }, [buttonDrink]);

  if (pathname === '/explorar/comidas') {
    return (
      <div>
        <p>Explore Drinks or Meals</p>
        <Link to="/explorar/comidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${randomFood}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            name="meal"
            onClick={ () => setButtonFood(true) }
          >
            Me Surpreenda!
          </button>
        </Link>
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${randomDrink}` }>
        <button
          type="button"
          data-testid="explore-surprise"
          name="cocktail"
          onClick={ () => setButtonDrink(true) }
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreDrinksOrMeals;
