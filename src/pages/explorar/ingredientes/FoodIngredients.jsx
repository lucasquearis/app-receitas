import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuFooter from '../../../components/MenuFooter';
import Header from '../../../components/Header';
import { fetchFood } from '../../../services/FetchFood';

export default function IgredientesFood() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const func = async () => {
      const fun = await fetchFood();
      const ingredientName = Object.values(fun.meals);
      const numberList = 12;
      setIngredients(ingredientName.slice(0, numberList));
    };
    func();
  }, []);
  return (
    <div>
      <Header title="Explorar Ingredientes" showSearchBottom={ false } />
      <div>
        {ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <div
            role="presentation"
            data-testid={ `${index}-ingredient-card` }
            key={ ingredient.idIngredient }
            onClick={ () => history
              .push({ pathname: '/comidas' }) }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="100px"
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt=""
            />
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</p>
          </div>
        ))}
      </div>
      <MenuFooter />
    </div>
  );
}
