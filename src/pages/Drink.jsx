import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import '../css/Card.css';

function Drink() {
  const { searchedRecipe, redirectDrink } = useContext(MyContext);
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
<<<<<<< HEAD
      <Header />
      { searchedRecipe.length > 1
        ? searchedDrinkRecipes() : redirectDrink()}
=======
      <Header titulo="Bebidas" />
      <h1>Drink</h1>
>>>>>>> e9f39c4f4e1208d479998ff84a9cd96c5893785d
      <Footer />
    </div>
  );
}

export default Drink;
