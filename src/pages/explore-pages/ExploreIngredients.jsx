import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import myContext from '../../context/myContext';
import '../../styles/Header.css';
import Footer from '../../components/Footer';

function ExploreIngredients() {
  const doze = 12;
  const { foodIngredients, setFoodIngredientSelected } = useContext(myContext);

  return (
    <div>
      <Header brand="Explorar Ingredientes" className="img-search" />
      {
        foodIngredients && foodIngredients.map((ingredient, index) => index < doze && (
          <div
            key={ index }
            className="div-card"
            data-testid={ `${index}-ingredient-card` }
          >
            <Link
              to="/comidas"
              onClick={ (e) => {
                setFoodIngredientSelected(e.target.id);
              } }
            >
              <button
                type="button"
                className="section-card"
                id={ ingredient.strIngredient }
              >
                <p
                  className="card-title"
                  data-testid={ `${index}-card-name` }
                  id={ ingredient.strIngredient }
                >
                  { ingredient.strIngredient }
                </p>
                <img
                  className="card-img"
                  src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                  alt={ ingredient.strIngredient }
                  data-testid={ `${index}-card-img` }
                  id={ ingredient.strIngredient }
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

export default ExploreIngredients;
