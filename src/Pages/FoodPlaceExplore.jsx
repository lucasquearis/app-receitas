import React, { useEffect, useState } from 'react';

function FoodPlaceExplore() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('American');
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    const getArea = async () => {
      const END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const response = await fetch(END_POINT);
      const { meals } = await response.json();
      setData(meals);
    };
    getArea();
  }, [setData]);

  useEffect(() => {
    const mealsFilter = async () => {
      const END_POINT2 = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`;
      const response = await fetch(END_POINT2);
      const { meals } = await response.json();
      setDataFilter(meals);
    };
    mealsFilter();
  }, [filter, setFilter]);

  const MNumber = '12';
  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        value={ filter }
        onChange={ ({ target: { value } }) => setFilter(value) }
      >
        {
          data
            .map(({ strArea }, index) => (
              <option
                key={ index }
                value={ strArea }
                data-testid={ `${strArea}-option` }
              >
                { strArea }
              </option>
            ))
        }
      </select>
      <p>
        filtro :
        { filter }
      </p>
      {
        dataFilter
          .slice(0, MNumber)
          .map(({ strMeal, strMealThumb, idMeal }, index) => (
            <div
              key={ idMeal }
              id={ idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ strMealThumb }
                data-testid={ `${index}-card-img` }
                alt={ strMeal }
              />
              <div>
                <h4
                  data-testid={ `${index}-card-name` }
                >
                  { strMeal }
                </h4>
              </div>
            </div>
          ))
      }
    </div>
  );
}

export default FoodPlaceExplore;
