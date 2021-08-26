// vitals
import React, { useContext, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import myContext from '../context/myContext';
// constants
import { ALERT_ONE, START_CARD, NUMBER_CATEGORIES } from '../services/data';

export default function SearchBar() {
  const {
    setSearchValues,
    filteredMeals,
    filteredDrinks,
    setUpdateData,
    /* baseCategoryDrinks */
    baseCategoryMeal } = useContext(myContext);
  const { pathname } = useLocation();
  const [textValue, setTextValue] = useState('');
  const [radioValue, setRadioValue] = useState('ingredient');

  const settings = ({ target: { name, value } }) => {
    if (name === 'filter-radio-button') return setRadioValue(value);
    if (name === 'search-text') return setTextValue(value);
  };
  const submit = () => {
    if (radioValue === 'letter' && textValue.length > 1) return global.alert(ALERT_ONE);
    setSearchValues({ textValue, radioValue, pathname });
  };

  if (pathname === '/comidas') {
    const { meals } = filteredMeals;
    if (meals !== null && Object.keys(meals).length === 1) {
      setUpdateData(meals);
      return <Redirect to={ `${pathname}/${meals[0].idMeal}` } />;
    }
  }

  if (pathname === '/bebidas') {
    const { drinks } = filteredDrinks;
    if (drinks !== null && Object.keys(drinks).length === 1) {
      setUpdateData(drinks);
      return <Redirect to={ `${pathname}/${drinks[0].idDrink}` } />;
    }
  }
  const { categories } = baseCategoryMeal;
  let cards = categories.slice(START_CARD, NUMBER_CATEGORIES);
  console.log(cards);
  return (
    <section className="search-container">
      <div className="search-container__input">
        <input
          type="text"
          name="search-text"
          data-testid="search-input"
          onChange={ (e) => settings(e) }
        />
      </div>
      <div className="search-container__radio-button" onChange={ (e) => settings(e) }>
        <label htmlFor="ingredient-search-radio">
          <input
            defaultChecked
            type="radio"
            name="filter-radio-button"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            value="ingredient"
          />
          Ingredientes
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="filter-radio-button"
            data-testid="name-search-radio"
            id="name-search-radio"
            value="name"
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="filter-radio-button"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            value="letter"
          />
          Primeira letra
        </label>
      </div>
      <label htmlFor="method">
        Categoria:
        <select
          type="select"
          name="method"
          id="method"
        >
          {Object.values(cards)
            .map((category, index) => (
              <option key={ index }>
                {category.strCategory}
              </option>
            ))}
        </select>
      </label>
      <div className="search-container__button">
        <button
          type="button"
          onClick={ submit }
        >
          Busca
        </button>
      </div>
    </section>
  );
}
