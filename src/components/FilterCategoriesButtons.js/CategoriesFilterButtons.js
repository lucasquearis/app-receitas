import React, { useState, useEffect } from 'react';
import { fetchApi } from '../SearchBar/utils';

const CategoriesFilterButtons = () => {
  const [categories, setCategories] = useState([]);
  const categoriesQuantity = 5;
  useEffect(() => {
    const path = window.location.pathname;
    let type;
    if (path === '/comidas') type = 'themealdb';
    if (path === '/bebidas') type = 'thecocktaildb';
    const fetchCategories = async () => {
      const response = await fetchApi(`https://www.${type}.com/api/json/v1/1/list.php?c=list`);
      const responseKey = Object.keys(response);
      if (responseKey[0] === 'meals'
        && response[responseKey].length > categoriesQuantity) {
        const categoriesArray = response[responseKey].slice(0, categoriesQuantity);
        setCategories(categoriesArray);
      }
      const categoriesArray = response[responseKey].slice(0, categoriesQuantity);
      setCategories(categoriesArray);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      {
        categories.map((categorie, index) => {
          const name = Object.values(categorie);
          return (
            <button
              key={ index }
              data-testid={ `${categorie.strCategory}-category-filter` }
              type="button"
            >
              {name[0]}
            </button>);
        })
      }
    </div>
  );
};

export default CategoriesFilterButtons;
