import React, { useState, useEffect } from 'react';
import { fetchArea, fetchMeals, fetchRegionMeal } from '../services/areaAPI';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

function ExploreArea() {
  const [area, setArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [mealsAll, setMealsAll] = useState([]);
  const [mealsArea, setMealsArea] = useState({});

  const NUMBER_ELEVEN = 11;

  useEffect(() => {
    fetchArea().then((response) => setArea(response.meals));
  });

  useEffect(() => {
    fetchMeals().then((response) => setMealsAll(response.meals));
  });

  useEffect(() => {
    fetchRegionMeal(selectedArea).then((response) => setMealsArea(response.meals));
  }, [selectedArea]);

  const select = () => {
    switch (true) {
    case selectedArea !== 'All': {
      if (mealsArea) {
        return mealsArea.map((meal, index) => (
          <Cards key={ index } element={ meal } index={ index } type="Meal" />
        ));
      }
      break;
    }
    case selectedArea === 'All': {
      if (mealsAll) {
        return mealsAll.filter((_e, index) => (index <= NUMBER_ELEVEN)).map((meal, i) => (
          <Cards key={ i } element={ meal } index={ i } type="Meal" />
        ));
      }
      break;
    }
    default:
      break;
    }
  };

  return (
    <>
      <Header titulo="Explorar Origem" />
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target: { value } }) => setSelectedArea(value) }
        >
          <option
            data-testid="All-option"
          >
            All
          </option>
          { area ? area.map(({ strArea }) => (
            <option
              key={ `${strArea}-key` }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          )) : null }
        </select>
        { select() }
      </div>
      <Footer />
    </>
  );
}

export default ExploreArea;
