import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';
import { START_CARD, NUMBER_CATEGORIES } from '../services/data';

export default function Filter() {
  const {
    mealCategories,
    drinkCategories,
    setSearchMeals,
    setSearchDrinks } = useContext(myContext);
  const { pathname } = useLocation();
  const [textToSend, setTextValue] = useState('');
  const [radioValueToSend, setRadioValue] = useState('name');
  const [usedTypeToRender, setUsedType] = useState('');

  useEffect(() => {
    if (pathname === '/comidas') {
      setSearchMeals({
        textValue: textToSend,
        radioValue: radioValueToSend,
        pathname: '/comidas' });
    } if (pathname === '/bebidas') {
      setSearchDrinks({
        textValue: textToSend,
        radioValue: radioValueToSend,
        pathname: '/bebidas' });
    }
  },
  [textToSend]);

  useEffect(() => {
    const { meals } = mealCategories;
    const { drinks } = drinkCategories;
    const usedMeals = (pathname === '/comidas'
      ? meals
      : drinks);
    const getUsedMeals = () => {
      const baseCategories = usedMeals.map((category) => (category.strCategory));
      const categoriesCheck = baseCategories
        .length > NUMBER_CATEGORIES ? NUMBER_CATEGORIES : baseCategories.length;
      const returnBaseCategories = baseCategories.slice(START_CARD, categoriesCheck);
      returnBaseCategories.push('All');
      setUsedType(returnBaseCategories);
    };
    getUsedMeals();
  },
  [textToSend, pathname]);

  const settings = ({ target: { id } }) => {
    const filterId = id === textToSend || id === 'All' ? '' : id;
    const filterSearchBtn = filterId === '' ? 'name' : 'category';
    setTextValue(filterId);
    setRadioValue(filterSearchBtn);
  };

  return (
    <div>
      {Object.values(usedTypeToRender)
        .map((category, index) => (
          <label htmlFor={ category } key={ index }>
            <button
              onClick={ (e) => { settings(e); } }
              type="button"
              name="filter-category-button"
              data-testid={ `${category}-category-filter` }
              id={ category }
              value="category"
            >
              { category }
            </button>
          </label>
        ))}
    </div>

  );
}
