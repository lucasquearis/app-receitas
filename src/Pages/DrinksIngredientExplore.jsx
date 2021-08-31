import React, { useEffect, useState } from 'react';

function DrinkIngredientesExplore() {
  const [data, setData] = useState([]);

  const getIngredient = async () => {
    const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(END_POINT);
    const { drinks } = await response.json();
    setData(drinks);
  };
  useEffect(() => {
    getIngredient();
  }, [setData]);

  const srcImg = (name) => `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;

  const MNumber = '12';
  return (
    <>
      {data
        .filter((_, item) => (item < MNumber))
        .map(({ strIngredient1 }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ srcImg(strIngredient1) }
              data-testid={ `${index}-card-img` }
              alt={ strIngredient1 }
            />
            <div>
              <h4
                data-testid={ `${index}-card-name` }
              >
                { strIngredient1 }
              </h4>
            </div>
          </div>
        ))}
    </>
  );
}

export default DrinkIngredientesExplore;
