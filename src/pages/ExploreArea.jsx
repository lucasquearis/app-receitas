import React, { useState, useEffect } from 'react';
import { fetchArea } from '../services/areaAPI';
import { fetchInicialFoods } from '../services/mealAPI';
import Header from '../components/Header';
import Cards from '../components/Cards';

function ExploreArea() {
  const [area, setArea] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [mealsArea, setMealsArea] = useState();

  useEffect(() => {
    fetchArea().
      then((response) => setArea(response.meals));
  });

  useEffect(() => {
    fetchInicialFoods().
      then((response) => setMealsArea(response));
  }, []);
  console.log(mealsArea);

  const selectArea = () => {
    mealsArea.forEach((mealObj) => {
      if (selectedArea === mealObj.strArea) {
        return <Cards element={ mealObj } index="0" type="Meal" />;
      }
    })
  }

  return (
    <>
      <Header titulo="Explorar Origem" />
      <div>
        <select
          data-testid="explore-by-area-dropdown"
        >
          <option
            data-testid="All-option"
            onChange={ ({ target: { value } }) => setSelectedArea(value) }
          >
            All
          </option>
          { area ? area.map(({ strArea }) => (
            <option
              key={ `${ strArea }-key` }
              data-testid={ `${ strArea }-option` }
              onChange={ ({ target: { value } }) => setSelectedArea(value) }
            >
              { strArea }
            </option>
          )) : null }
        </select>
        { selectArea() }
      </div>
    </>
  );
}

export default ExploreArea;
