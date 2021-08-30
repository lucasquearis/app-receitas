import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DrinkContext from '../context/DrinkContext';
import MyContext from '../context/MyContext';
import '../css/Card.css';
import Cards from '../components/Cards';
import CategoriesButtons from '../components/CategoriesButtons';

function Drink() {
  const { searchedRecipe, redirectDrink } = useContext(MyContext);
  const { Drinks, drinksCategories } = useContext(DrinkContext);
  const recipeLimit = 12;

  function searchedDrinkRecipes() {
    return (
      <div className="card-section">
        {
          searchedRecipe.filter((drink, i) => i < recipeLimit).map((drink, i) => (
            <Card
              key={ i }
              data-testid={ `${i}-recipe-card` }
              style={ { width: '10rem' } }
            >
              <Card.Img
                data-testid={ `${i}-card-img` }
                variant="top"
                src={ drink.strDrinkThumb }
              />
              <Card.Body>
                <Card.Title
                  data-testid={ `${i}-card-name` }
                >
                  { drink.strDrink }
                </Card.Title>
              </Card.Body>
            </Card>
          ))
        }
      </div>
    );
  }

  return (
    <div>
      <Header titulo="Bebidas" />
      { searchedRecipe.length > 1
        ? searchedDrinkRecipes() : redirectDrink()}

      <div>
        <CategoriesButtons type="Drink" categories={ drinksCategories } />
      </div>

      <main>
        {
          Drinks.slice(0, recipeLimit).map((element, index) => (
            <Cards
              key={ index }
              index={ index }
              type="Drink"
              element={ element }
            />
          ))
        }
      </main>

      <Footer />
    </div>
  );
}

export default Drink;
