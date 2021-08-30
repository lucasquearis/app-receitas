// vitals
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';
// constants
import { START_CARD, NUMBER_CATEGORIES } from '../services/data';

export default function Filter() {
  const {
    mealCategoriesBase,
    drinkCategoriesBase,
    setSearchValues } = useContext(myContext);
  const { pathname } = useLocation();
  const [textValue, setTextValue] = useState('');
  const [radioValue, setRadioValue] = useState('');

  const submit = () => {
    setSearchValues({ textValue, radioValue, pathname });
  };

  const settings = async ({ target: { value, id } }) => {
    const filter = id === textValue || id === 'All' ? '' : id;
    await setRadioValue(value);
    await setTextValue(filter);
    await submit();
  };

  const usedMeals = (pathname === '/comidas'
    ? mealCategoriesBase.categories
    : drinkCategoriesBase.drinks);

  const baseCategories = usedMeals.map((category) => (category.strCategory)); // quebra aqui no cypress
  const categoriesCheck = baseCategories
    .length > NUMBER_CATEGORIES ? NUMBER_CATEGORIES : baseCategories.length;
  const returnBaseCategories = baseCategories.slice(START_CARD, categoriesCheck);
  returnBaseCategories.push('All');

  return (
    <div>
      {Object.values(returnBaseCategories)
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
