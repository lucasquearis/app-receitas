import React, { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect, useLocation } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import Header from '../Component/Header';
import Footer from '../Component/Footer';

function ExploreDrinksAndFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { pathname } = useLocation();
  const { setIngredientFilter, setFoodOrDrink } = useContext(AppContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (pathname === '/explorar/comidas/ingredientes') {
      const api = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const result = async () => {
        const data = await fetch(api).then((response) => response.json());
        setIngredients(data.meals);
      };
      result();
    }
    if (pathname === '/explorar/bebidas/ingredientes') {
      const api = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const result = async () => {
        const data = await fetch(api).then((response) => response.json());
        setIngredients(data.drinks);
      };
      result();
    }
  }, [pathname]);

  const handleClickComidas = (ingredient) => {
    setIngredientFilter(ingredient);
    setFoodOrDrink('food');
    setRedirect(true);
  };

  const handleClickBebidas = async (ingredient) => {
    setIngredientFilter(ingredient);
    setFoodOrDrink('drink');
    setRedirect(true);
  };

  if (ingredients.length !== 0) {
    if (pathname === '/explorar/comidas/ingredientes') {
      if (redirect === true) {
        return <Redirect to="/comidas" />;
      }
      const number = 12;
      return (
        <div>
          <Header titlePage="Explorar Ingredientes" />
          <div className="header-space"> </div>
          <div className="container-cards">
            { ingredients.filter((ingredient) => ingredients.indexOf(ingredient) < number)
              .map((ingredient, index) => (
                <button
                  data-testid={ `${index}-ingredient-card` }
                  className="horizontal-card"
                  key={ index }
                  type="button"
                  onClick={ () => handleClickComidas(ingredient.strIngredient) }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    className="img-horizontal-card"
                    src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                    alt="ingredient ilustration"
                  />
                  <div className="horizontal-card-infos">
                    <span
                      data-testid={ `${index}-card-name` }
                      className="name-horizontal-card"
                    >
                      {ingredient.strIngredient}
                    </span>
                  </div>
                </button>
              ))}
          </div>
          <Footer />
        </div>
      );
    }
    if (pathname === '/explorar/bebidas/ingredientes') {
      if (redirect === true) {
        return <Redirect to="/bebidas" />;
      }
      const api = 'https://www.thecocktaildb.com/images/ingredients/';
      const number = 12;
      return (
        <div>
          <Header titlePage="Explorar Ingredientes" />
          <div className="header-space"> </div>
          <div className="container-cards">
            { ingredients.filter((ingredient) => ingredients.indexOf(ingredient) < number)
              .map((ingredient, index) => (
                <button
                  data-testid={ `${index}-ingredient-card` }
                  className="horizontal-card"
                  type="button"
                  key={ index }
                  onClick={ () => handleClickBebidas(ingredient.strIngredient1) }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    className="img-horizontal-card"
                    src={ `${api}${ingredient.strIngredient1}-Small.png` }
                    alt="ingredient ilustration"
                  />
                  <div className="horizontal-card-infos">
                    <span
                      data-testid={ `${index}-card-name` }
                      className="name-horizontal-card"
                    >
                      {ingredient.strIngredient1}
                    </span>
                  </div>
                </button>
              ))}
          </div>
          <Footer />
        </div>
      );
    }
  }
  return (
    <Spinner className="loading" animation="border" role="status">
      <span className="visually-hidden"> </span>
    </Spinner>
  );
}

export default ExploreDrinksAndFoodsByIngredients;
