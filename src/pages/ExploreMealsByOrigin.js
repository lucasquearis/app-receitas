import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import './pageCSS/ExploreMealsByOrigin.css';
import fetchCategories from '../services/Category/fetchCategories';
import fetchFoods from '../services/Header-SearchBar/Foods/fetchFoods';
import fetchFoodbyArea from '../services/Header-SearchBar/Foods/fetchFoodbyArea';
import Header from '../components/Header';

export default function ExploreMealsByOrigin() {
  const [mealsData, setMealsData] = useState([]);
  const [areas, setAreas] = useState([]);
  const max = 12;
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    fetchCategories(pathname).then((response) => {
      setAreas([{ strArea: 'All' }, ...response]);
    });
    fetchFoods().then((response) => {
      setMealsData(response.meals);
    });
  }, [pathname]);

  const setDataMealsctedArea = async ({ target: { value } }) => {
    if (value !== 'All') {
      fetchFoodbyArea(value).then((response) => {
        setMealsData(response.meals);
      });
      return true;
    }
    fetchFoods().then((response) => {
      setMealsData(response.meals);
    });
  };

  const fillSelectItems = () => areas.map((area, index) => (
    <option
      key={ index }
      value={ area.strArea }
      data-testid={ `${area.strArea}-option` }
    >
      { area.strArea }
    </option>
  ));

  const fillCardsMeals = () => (
    mealsData.slice(0, max).map((meal, index) => (
      <Link to={ `/comidas/${meal.idMeal}` } key={ index }>
        <div
          className="card-container"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ meal.strMealThumb }
            alt="Recipe"
            className="card-thumb"
            data-testid={ `${index}-card-img` }
          />
          <h4 data-testid={ `${index}-card-name` }>
            { meal.strMeal }
          </h4>
        </div>
      </Link>
    ))
  );
  return (
    <>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ setDataMealsctedArea }
      >
        { fillSelectItems() }
      </select>
      { fillCardsMeals() }
      <BottomMenu />
    </>
  );
}
