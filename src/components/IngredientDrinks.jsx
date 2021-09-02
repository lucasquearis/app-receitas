import React, { useContext } from 'react';
import recepieContext from '../context/Context';

export default function IngredientDrinks() {
  const { drinks } = useContext(recepieContext);

  const allIngredients = [];
  drinks.map((i) => allIngredients.push(...Object.entries(i)
    .filter((item) => item[0].includes('strIngredient'))
    .map((item) => item[1])
    .filter((item) => item !== '' && item !== null && item !== ' ')));
  const max = 12;
  const filterAllIngredients = allIngredients
    .filter((item, index) => allIngredients.indexOf(item) === index);

  if (filterAllIngredients.length > 0) {
    return (
      filterAllIngredients.slice(0, max).map((item, index) => (
        <div
          key={ item }
          data-testid={ `${index}-ingredient-card` }
        >
          <div>
            <img
              src={ `https://www.themealdb.com/images/ingredients/${item}.png` }
              alt="imagem"
              data-testid={ `${index}-card-img` }
              width="100%"
            />
            <p data-testid={ `${index}-card-name` }>{item}</p>
          </div>
        </div>))
    );
  }
  return (
    <div>Drink</div>
  );
}
