import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components';
import HeaderMeals from '../components/HeaderMeals';
import Footer from '../components/Footer';
import * as api from '../services/api';
import AppContext from '../context/AppContext';
import './css/Meals.css';

const mealsAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const categoriesAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const categoryAPI = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const MEALS_LENGTH = 12;
const CATEGORIES_LENGTH = 5;

const Meals = () => {
  const [categories, setCategories] = useState([]);
  const [categoryEntry, setCategoryEntry] = useState('');
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [lastCategory, setLastCategory] = useState('');
  const { data, setData } = useContext(AppContext);

  useEffect(() => {
    api.getMeals(mealsAPI, MEALS_LENGTH, setData);
    api.getMeals(categoriesAPI, CATEGORIES_LENGTH, setCategories);
  }, []);

  useEffect(() => {
    if (categoryClicked && (categoryEntry !== lastCategory)) {
      if (categoryEntry === 'All') api.getMeals(mealsAPI, MEALS_LENGTH, setData);
      else api.getMeals(`${categoryAPI}${categoryEntry}`, MEALS_LENGTH, setData);
      setLastCategory(categoryEntry);
    }
    if (categoryClicked && (categoryEntry === lastCategory)) {
      api.getMeals(mealsAPI, MEALS_LENGTH, setData);
      setLastCategory('');
    }
    setCategoryClicked(false);
  }, [categoryClicked]);

  const handleCategoryClick = ({ target: { name } }) => {
    setCategoryEntry(name);
    setCategoryClicked(true);
  };

  return (
    <>
      <HeaderMeals title="Comidas" />
      <div className="meals-container">
        <div className="meals-categories-container">
          <Button
            type="button"
            id="All-category-filter"
            className="meals-categories"
            buttonText="All"
            onClick={ handleCategoryClick }
            isDisable={ false }
          />
          { categories.map((category, index) => (
            <Button
              key={ index }
              type="button"
              id={ `${category.strCategory}-category-filter` }
              className="meals-categories"
              buttonText={ category.strCategory }
              onClick={ handleCategoryClick }
              isDisable={ false }
            />
          )) }
        </div>
        <div className="meals-cards-container">
          { data.length
            ? (data.map((meal, index) => (
              <Link
                to={ `comidas/${meal.idMeal}` }
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
    </>
  );
};

export default Meals;
