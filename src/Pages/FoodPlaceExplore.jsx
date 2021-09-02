import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


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
    if (filter === 'All') {
      const allMeals = async () => {
        const END_POINT2 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=All';
        const response = await fetch(END_POINT2);
        const { meals } = await response.json();
        setDataFilter(meals);
      };
      allMeals();
    } else {
      const mealsFilter = async () => {
        const END_POINT2 = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`;
        const response = await fetch(END_POINT2);
        const { meals } = await response.json();
        setDataFilter(meals);
      };
      mealsFilter();
    }
  }, [filter, setFilter]);

  const MNumber = '12';
  const path = (id) => `/comidas/${id}`;

  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        value={ filter }
        onChange={ ({ target: { value } }) => setFilter(value) }
      >
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
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
            <Link key={ idMeal } to={ path(idMeal) }>
              <div
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
            </Link>
          ))
      }
    </div>
  );
}

export default FoodPlaceExplore;
