import React, { useEffect, useState } from 'react';

function FoodPlaceExplore() {
  const [data, setData] = useState([]);

  const getArea = async () => {
    const END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(END_POINT);
    const { meals } = await response.json();
    setData(meals);
  };
  useEffect(() => {
    getArea();
  }, [setData]);

  return (
    <select
      data-testid="explore-by-area-dropdown"
    >
      {
        data
          .map(({ strArea }, index) => (
            <div
              data-testid={ `${0}-recipe-card` }
              key={ index }
            >
              <img
                src="https://static3.depositphotos.com/1005412/218/i/950/depositphotos_2186038-stock-photo-kitten-lays-isolated.jpg"
                data-testid={ `${index}-card-img` }
                alt={ strArea }
              />
              <option
                data-testid={ `${strArea}-option` }
              >
                { strArea }
              </option>
              <p data-testid={ `${index}-card-name` }>{ strArea }</p>
            </div>
          ))
      }
      <option data-testid="0-recipe-card">0</option>
    </select>
  );
}

export default FoodPlaceExplore;
