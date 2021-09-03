import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import myContext from '../../context/myContext';
import ArrowIcon from '../../images/ArrowIcon.svg';
import Footer from '../../components/Footer';

function ExploreIngredients() {
  const doze = 12;
  const { foodIngredients, setFoodIngredientSelected } = useContext(myContext);
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  return (
    <div>
      <Header brand="Explorar Ingredientes" className="img-search" />
      <button className="voltar2 " type="button" onClick={ goToPreviousPath }>
        <img className="explore" src={ ArrowIcon } alt="voltar" />
      </button>
      <div className="div-ingredients-card">
        {
          foodIngredients && foodIngredients.map((ingredient, index) => index < doze && (
            <div
              key={ index }
              className="div-ingredient-card"
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
      </div>
      <Footer />
    </div>
  );
}

export default ExploreIngredients;
