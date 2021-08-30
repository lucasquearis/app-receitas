// vitals
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';
// constants
import { START_CARD, NUMBER_CATEGORIES } from '../services/data';

export default function Filter() {
  const {
    mealCategories,
    drinkCategories,
    setSearchMeals,
    setSearchDrinks } = useContext(myContext);
  const { pathname } = useLocation();
  const [textToSend, setTextValue] = useState('');
  const [usedMealsToRender, setUsedMeals] = useState('');

  useEffect(() => {
    const { categories } = mealCategories;
    const { drinks } = drinkCategories;
    const usedMeals = (pathname === '/comidas'
      ? categories
      : drinks);
    const getUsedMeals = async () => {
      const baseCategories = usedMeals.map((category) => (category.strCategory)); // quebra aqui no cypress
      const categoriesCheck = baseCategories
        .length > NUMBER_CATEGORIES ? NUMBER_CATEGORIES : baseCategories.length;
      const returnBaseCategories = baseCategories.slice(START_CARD, categoriesCheck);
      returnBaseCategories.push('All');
      setUsedMeals(returnBaseCategories);
    };
    getUsedMeals();
  },
  [pathname, mealCategories, drinkCategories]);

  /*   const baseCategories = usedMeals.map((category) => (category.strCategory)); // quebra aqui no cypress
  const categoriesCheck = baseCategories
    .length > NUMBER_CATEGORIES ? NUMBER_CATEGORIES : baseCategories.length;
  const returnBaseCategories = baseCategories.slice(START_CARD, categoriesCheck);
  returnBaseCategories.push('All'); */

  /* const [radioValue, setRadioValue] = useState(''); */
  const MEAL_CAT = {
    textValue: textToSend,
    radioValue: 'category',
    pathname: '/comidas' };
  const DRINK_CAT = {
    textValue: textToSend,
    radioValue: 'category',
    pathname: '/bebidas' };

  const submit = () => {
    console.log('teste');
    if (pathname === '/comidas') {
      setSearchMeals(MEAL_CAT);
    } else { setSearchDrinks(DRINK_CAT); }
  };

  /* const settings = async ({ target: { id } }) => {
    const filter = id === textToSend || id === 'All' ? '' : id;
    await setRadioValue(value);
    await setTextValue(filter);
    await submit()
  }; */

  const settings = async ({ target: { id } }) => {
    const filter = id === textToSend || id === 'All' ? '' : id;
    await setTextValue(filter);
    if (pathname === '/comidas') {
      await setSearchMeals({
        textValue: textToSend,
        radioValue: 'category',
        pathname: '/comidas' });
      console.log(MEAL_CAT);
    } else {
      setSearchDrinks({
        textValue: textToSend,
        radioValue: 'category',
        pathname: '/bebidas' });
    }
  };

  /*  const usedMeals = (pathname === '/comidas'
    ? categories
    : drinks);

  const baseCategories = usedMeals.map((category) => (category.strCategory)); // quebra aqui no cypress
  const categoriesCheck = baseCategories
    .length > NUMBER_CATEGORIES ? NUMBER_CATEGORIES : baseCategories.length;
  const returnBaseCategories = baseCategories.slice(START_CARD, categoriesCheck);
  returnBaseCategories.push('All'); */

  return (
    <div>
      {Object.values(usedMealsToRender)
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
