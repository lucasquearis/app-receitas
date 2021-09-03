import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuFooter from '../../../components/MenuFooter';
import Header from '../../../components/Header';
import { fetchDrinks } from '../../../services/FetchDrinks';

export default function IgredientesDrinks() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const func = async () => {
      const fun = await fetchDrinks();
      const ingredientName = Object.values(fun.drinks);
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
              .push({ pathname: '/bebidas' }) }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="100px"
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
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
