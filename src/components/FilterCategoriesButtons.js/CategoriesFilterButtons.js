import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionRequestItems, actionRequestSuccess } from '../../actions';
import { fetchApi } from '../SearchBar/utils';

const CategoriesFilterButtons = () => {
  const [categories, setCategories] = useState([]);
  const [itemType, setItemType] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const dispatch = useDispatch();
  const categoriesQuantity = 5;
  useEffect(() => {
    const path = window.location.pathname;
    let type;
    if (path === '/comidas') {
      type = 'themealdb';
      setApiUrl('themealdb');
    }
    if (path === '/bebidas') {
      type = 'thecocktaildb';
      setApiUrl('thecocktaildb');
    }
    const fetchCategories = async () => {
      const response = await fetchApi(`https://www.${type}.com/api/json/v1/1/list.php?c=list`);
      const responseKey = Object.keys(response);
      if (responseKey[0] === 'meals'
        && response[responseKey].length > categoriesQuantity) {
        const categoriesArray = response[responseKey].slice(0, categoriesQuantity);
        setCategories(categoriesArray);
        setItemType('meals');
      } else {
        const categoriesArray = response[responseKey].slice(0, categoriesQuantity);
        setCategories(categoriesArray);
        setItemType('drinks');
      }
    };
    fetchCategories();
  }, []);

  const handleClick = async (category, apiURl) => {
    dispatch(actionRequestItems());
    const response = await fetchApi(`https://www.${apiURl}.com/api/json/v1/1/filter.php?c=${category}`);
    const responseKey = Object.keys(response);
    dispatch(actionRequestSuccess(response[responseKey]));
  };

  return (
    <div>
      {
        categories.map((categorie, index) => {
          // console.log(categories);
          const name = Object.values(categorie);
          return (
            <button
              key={ index }
              data-testid={ `${categorie.strCategory}-category-filter` }
              type="button"
              onClick={ () => handleClick(categorie.strCategory, apiUrl) }
            >
              {name[0]}
            </button>);
        })
      }
    </div>
  );
};

export default CategoriesFilterButtons;
