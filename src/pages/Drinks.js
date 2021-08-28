import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { Button, Card, Footer, HeaderDrinks } from '../components';
import removeSomeSpaceAndSlash from '../helpers/fomartCategoriesID';
import * as api from '../services/api';
import './css/Drinks.css';

const drinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const categoriesAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const categoryAPI = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const DRINKS_LENGTH = 12;
const CATEGORIES_LENGTH = 5;

const Drinks = () => {
  const [categories, setCategories] = useState([]);
  const [categoryEntry, setCategoryEntry] = useState('');
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [lastCategory, setLastCategory] = useState('');
  const { data, setData } = useContext(AppContext);

  const resetBorder = () => {
    const categoryButtons = document.querySelectorAll('.drinks-categories');
    categoryButtons.forEach((button) => {
      button.style.border = 'none';
      button.style.cssText = 'button:hover{ border 0.15em solid black }';
    });
  };

  useEffect(() => {
    api.getDrinks(drinksAPI, DRINKS_LENGTH, setData);
    api.getDrinks(categoriesAPI, CATEGORIES_LENGTH, setCategories);
  }, []);

  useEffect(() => {
    if (categoryClicked && (categoryEntry !== lastCategory)) {
      if (categoryEntry === 'All') api.getDrinks(drinksAPI, DRINKS_LENGTH, setData);
      else api.getDrinks(`${categoryAPI}${categoryEntry}`, DRINKS_LENGTH, setData);
      setLastCategory(categoryEntry);
      resetBorder();
      const selectedButton = document
        .querySelector(`#${removeSomeSpaceAndSlash(categoryEntry)}-category-filter`);
      selectedButton.style.border = '0.15em solid black';
    }
    if (categoryClicked && (categoryEntry === lastCategory)) {
      api.getDrinks(drinksAPI, DRINKS_LENGTH, setData);
      setLastCategory('');
      resetBorder();
      const selectedButton = document
        .querySelector(`#${removeSomeSpaceAndSlash(categoryEntry)}-category-filter`);
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
    <div className="drinks-container">
      <HeaderDrinks title="Bebidas" />
      <div className="drinks-categories-container">
        <Button
          type="button"
          id="All-category-filter"
          className="drinks-categories"
          buttonText="All"
          onClick={ handleCategoryClick }
          isDisable={ false }
        />
        { categories.map((category, index) => (
          <Button
            key={ index }
            type="button"
            id={ `${category.strCategory}-category-filter` }
            className="drinks-categories"
            buttonText={ category.strCategory }
            onClick={ handleCategoryClick }
            isDisable={ false }
          />
        )) }
      </div>
      <div className="drinks-cards-container">
        { data.length
          ? (data.map((drink, index) => (
            <Link
              to={ `bebidas/${drink.idDrink}` }
              key={ drink.idDrink }
              className="drink-card-link"
            >
              <Card
                type="Drink"
                index={ index }
                thumb={ drink.strDrinkThumb }
                name={ drink.strDrink }
                onClick={ handleCategoryClick }
                isDisable={ false }
              />
            </Link>
          ))) : ''}
      </div>
      <Footer />
    </div>
  );
};

export default Drinks;
