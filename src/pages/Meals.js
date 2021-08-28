import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { Button, Card, Footer, HeaderMeals } from '../components';
import * as api from '../services/api';
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

  const resetBorder = () => {
    const categoryButtons = document.querySelectorAll('.meals-categories');
    categoryButtons.forEach((button) => {
      button.style.border = 'none';
      button.style.cssText = 'button:hover{ border 0.15em solid black }';
    });
  };

  useEffect(() => {
    api.getMeals(mealsAPI, MEALS_LENGTH, setData);
    api.getMeals(categoriesAPI, CATEGORIES_LENGTH, setCategories);
  }, []);

  useEffect(() => {
    if (categoryClicked && (categoryEntry !== lastCategory)) {
      if (categoryEntry === 'All') api.getMeals(mealsAPI, MEALS_LENGTH, setData);
      else api.getMeals(`${categoryAPI}${categoryEntry}`, MEALS_LENGTH, setData);
      setLastCategory(categoryEntry);
      resetBorder();
      const selectedButton = document.querySelector(`#${categoryEntry}-category-filter`);
      selectedButton.style.border = '0.15em solid black';
    }
    if (categoryClicked && (categoryEntry === lastCategory)) {
      api.getMeals(mealsAPI, MEALS_LENGTH, setData);
      setLastCategory('');
      resetBorder();
      const selectedButton = document.querySelector(`#${categoryEntry}-category-filter`);
      selectedButton.style.border = 'none';
      selectedButton.style.cssText = 'button:hover{ border 0.15em solid black }';
    }
    setCategoryClicked(false);
  }, [categoryClicked]);

  const handleCategoryClick = ({ target: { name } }) => {
    setCategoryEntry(name);
    setCategoryClicked(true);
  };

  return (
    <div className="meals-container">
      <HeaderMeals title="Comidas" />
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
        <Footer />
      </div>
    </div>
  );
};

export default Meals;
