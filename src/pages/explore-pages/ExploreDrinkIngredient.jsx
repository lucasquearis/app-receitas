import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import myContext from '../../context/myContext';
import '../../styles/Header.css';
import Footer from '../../components/Footer';

function ExploreDrinkIngredient() {
  const doze = 12;
  const {
    drinkIngredients,
    setDrinkIngredientSelected,
  } = useContext(myContext);
  return (
    <div>
      <Header brand="Explorar Ingredientes" className="img-search" />
      {
        drinkIngredients && drinkIngredients.map((ingredient, index) => index < doze && (
          <div
            key={ index }
            className="div-card"
            data-testid={ `${index}-ingredient-card` }
          >
            <Link
              to="/bebidas"
              onClick={ (e) => {
                setDrinkIngredientSelected(e.target.id);
              } }
            >
              <button
                id={ ingredient.strIngredient1 }
                type="button"
                className="section-card"
              >
                <p
                  className="card-title"
                  data-testid={ `${index}-card-name` }
                  id={ ingredient.strIngredient1 }
                >
                  { ingredient.strIngredient1 }
                </p>
                <img
                  className="card-img"
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                  alt=""
                  id={ ingredient.strIngredient1 }
                  data-testid={ `${index}-card-img` }
                />
              </button>
            </Link>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredient;
