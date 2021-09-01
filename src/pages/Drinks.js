import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import DrinksContext from '../context/DrinksContext';
import FooterMenu from '../components/FooterMenu';
import ButtonCategoriesDrinks from '../components/ButtonCategoriesDrinks';
import './drinks.css';
import '../components/drinksCard.css';

const Drinks = () => {
  const { drinks, categoriesDrinks, drinksByCategories } = useContext(DrinksContext);
  const history = useHistory();
  const DRINKS = 12;

  if (drinks === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (drinks.length === 1 && drinksByCategories === false) {
    history.push(`/bebidas/${drinks[0].idDrink}`);
  }

  return (
    <div className="container">
      <Header title="Bebidas" />

      <ButtonCategoriesDrinks categories={ categoriesDrinks } />

      <div className="drinks-container">
        {drinks && drinks.slice(0, DRINKS)
          .map((drink, index) => (
            <Link key={ index } to={ `/bebidas/${drink.idDrink}` }>
              <RecipeCard
                key={ index }
                index={ index }
                srtRecipeThumb={ drink.strDrinkThumb }
                srtRecipe={ drink.strDrink }
              />
            </Link>
          ))}
      </div>
      <FooterMenu />
    </div>
  );
};

export default Drinks;
