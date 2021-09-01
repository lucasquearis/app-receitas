import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { HeaderMeals, Footer, Card } from '../components';
import * as api from '../services/api';
import './css/MealsByArea.css';

const mealsAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const areasAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const areaAPI = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const MEALS_LENGTH = 12;
const AREAS_LENGTH = 'default';

const MealsByArea = () => {
  const [areas, setAreas] = useState([]);
  const [areaSelected, setAreaSelected] = useState('All');
  const [changeArea, setChangeArea] = useState(false);
  const { data, setData } = useContext(AppContext);

  useEffect(() => {
    api.getMeals(areasAPI, AREAS_LENGTH, setAreas);
    api.getMeals(mealsAPI, MEALS_LENGTH, setData);
  }, []);

  useEffect(() => {
    if (areaSelected === 'All') {
      api.getMeals(mealsAPI, MEALS_LENGTH, setData);
    }
    if (changeArea && areaSelected !== 'All') {
      api.getMeals(`${areaAPI}${areaSelected}`, MEALS_LENGTH, setData);
    }
    setChangeArea(false);
  }, [areaSelected]);

  const handleChange = ({ target: { value } }) => {
    setAreaSelected(value);
    setChangeArea(true);
  };

  return (
    <div className="expore-by-area-container">
      <HeaderMeals title="Explorar Origem" />
      <label htmlFor="area-select" className="explore-by-area-select-container">
        <select
          id="area-select"
          className="explore-by-area-select form-select"
          data-testid="explore-by-area-dropdown"
          value={ areaSelected }
          onChange={ handleChange }
        >
          <option
            value="All"
            className="explore-by-area-option"
            data-testid="All-option"
          >
            All
          </option>
          { areas.map(({ strArea }) => (
            <option
              key={ strArea }
              value={ strArea }
              className="explore-by-area-option"
              data-testid={ `${strArea}-option` }
            >
              {strArea}
            </option>
          ))}
        </select>
      </label>
      <div className="meals-cards-container">
        { data.length
          ? (data.map((meal, index) => (
            <Link
              to={ `/comidas/${meal.idMeal}` }
              key={ meal.idMeal }
              className="meal-card-link"
            >
              <Card
                type="Meal"
                index={ index }
                thumb={ meal.strMealThumb }
                name={ meal.strMeal }
              />
            </Link>
          ))) : ''}
      </div>
      <Footer />
    </div>
  );
};

export default MealsByArea;
