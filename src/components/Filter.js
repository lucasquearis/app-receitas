// vitals
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';
// constants
import { START_CARD, NUMBER_CARDS, NUMBER_CATEGORIES } from '../services/data';

export default function Filter() {
  const { filteredMeals, mealCategoriesBase, setSearchValues } = useContext(myContext);
  const { pathname } = useLocation();
  const [textValue, setTextValue] = useState('');
  const [radioValue, setRadioValue] = useState('');

  const settings = ({ target: { value, id } }) => {
    setRadioValue(value);
    setTextValue(id);
  };

  const submit = () => {
    setSearchValues({ textValue, radioValue, pathname });
  };

  // filtro das categorias bases
  const { categories } = mealCategoriesBase;
  const baseCategories = categories.map((category) => (category.strCategory)).sort(); // quebra aqui
  const categoriesCheck = baseCategories
    .length > NUMBER_CARDS ? NUMBER_CATEGORIES : baseCategories.length;
  const returnBaseCategories = baseCategories.slice(START_CARD, categoriesCheck);
  console.log(returnBaseCategories);

  const { meals } = filteredMeals;
  // confere se o context está só com 12 itens
  const renderedCards = meals.length > NUMBER_CARDS ? NUMBER_CARDS : meals.length;
  const returnedArray = meals.slice(START_CARD, renderedCards);
  // filtro das categorias renderizadas
  const renderedCategories = returnedArray.map((category) => (category.strCategory));
  const uniqueCategories = renderedCategories
    .filter((val, id, array) => array.indexOf(val) === id).sort();
  const categoriesLimit = uniqueCategories
    .length > NUMBER_CATEGORIES ? NUMBER_CATEGORIES : uniqueCategories.length;
  const returnedCategories = uniqueCategories.slice(START_CARD, categoriesLimit);

  console.log(returnedCategories);
  return (
    <div>
      {Object.values(returnBaseCategories)
        .map((category, index) => (
          <label htmlFor={ category } key={ index }>
            <input
              onClick={ (e) => { settings(e); submit(); } }
              type="radio"
              name="filter-category-button"
              data-testid={ `${category}-category-filter` }
              id={ category }
              value="category"
              dathtml={ `${category}` }
            />
            {returnBaseCategories[index]}
          </label>
        ))}
    </div>

  );
}
