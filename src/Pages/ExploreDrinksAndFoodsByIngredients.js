import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import AppContext from '../Context/AppContext';

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
    console.log(ingredient);
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
          { ingredients.filter((ingredient) => ingredients.indexOf(ingredient) < number)
            .map((ingredient, index) => (
              <button
                type="button"
                onClick={ () => handleClickComidas(ingredient.strIngredient) }
                data-testid={ `${index}-ingredient-card` }
                key={ index }
              >
                <Card
                  style={ { width: '8.75rem' } }
                >
                  <Card.Img
                    variant="top"
                    src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                    alt="ingredient ilustration"
                    data-testid={ `${index}-card-img` }
                  />
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    {ingredient.strIngredient}
                  </Card.Title>
                </Card>
              </button>
            ))}
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
          { ingredients.filter((ingredient) => ingredients.indexOf(ingredient) < number)
            .map((ingredient, index) => (
              <button
                type="button"
                data-testid={ `${index}-ingredient-card` }
                key={ index }
                onClick={ () => handleClickBebidas(ingredient.strIngredient1) }
              >
                <Card
                  style={ { width: '8.75rem' } }
                >
                  <Card.Img
                    variant="top"
                    src={ `${api}${ingredient.strIngredient1}-Small.png` }
                    alt="ingredient ilustration"
                    data-testid={ `${index}-card-img` }
                  />
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    {ingredient.strIngredient1}
                  </Card.Title>
                </Card>
              </button>
            ))}
        </div>
      );
    }
  }
  return <p>Carregando...</p>;
}

export default ExploreDrinksAndFoodsByIngredients;
