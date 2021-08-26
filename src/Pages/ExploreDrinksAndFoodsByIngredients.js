import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function ExploreDrinksAndFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/explorar/comidas/ingredientes') {
      const api = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const result = async () => {
        const data = await fetch(api).then((response) => response.json());
        console.log(data.meals);
        setIngredients(data.meals);
      };
      result();
    }
    if (pathname === '/explorar/bebidas/ingredientes') {
      const api = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const result = async () => {
        const data = await fetch(api).then((response) => response.json());
        console.log(data.drinks);
        setIngredients(data.drinks);
      };
      result();
    }
  }, [pathname]);

  if (ingredients.length !== 0) {
    if (pathname === '/explorar/comidas/ingredientes') {
      const number = 12;
      return (
        <div>
          { ingredients.filter((ingredient) => ingredients.indexOf(ingredient) < number)
            .map((ingredient, index) => (
              <div data-testid={ `${index}-ingredient-card` } key={ index }>
                <Link to="/explorar/comidas">
                  <Card>
                    <img
                      variant="top"
                      src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png` }
                      style={ { width: '50px' } }
                      alt="ingredient ilustration"
                    />
                    <Card.Title>{ingredient.strIngredient}</Card.Title>
                  </Card>
                </Link>
              </div>
            ))}
        </div>
      );
    }
    if (pathname === '/explorar/bebidas/ingredientes') {
      const api = 'https://www.thecocktaildb.com/images/ingredients/';
      const number = 12;
      return (
        <div>
          { ingredients.filter((ingredient) => ingredients.indexOf(ingredient) < number)
            .map((ingredient, index) => (
              <div data-testid={ `${index}-ingredient-card` } key={ index }>
                <Link to="/explorar/bebidas">
                  <Card>
                    <img
                      src={ `${api}${ingredient.strIngredient1.toLowerCase()}.png` }
                      className="card-image"
                      style={ { width: '50px' } }
                      alt="ingredient ilustration"
                    />
                    <Card.Title>{ingredient.strIngredient1}</Card.Title>
                  </Card>
                </Link>
              </div>
            ))}
        </div>
      );
    }
  }
  return <p>Carregando...</p>;
}

export default ExploreDrinksAndFoodsByIngredients;
