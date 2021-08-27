import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Categories() {
  const [categoriesMeals, setCategoriesMeal] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;
  console.log(pathname);
  // console.log(fetchCategories('/bebidas'));

  useEffect(() => {
    const getCategoriesMeals = async () => {
      const MAX_CATEGORY = 5;
      if (pathname === '/comidas') {
        const URL_API_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const result = await fetch(URL_API_MEALS);
        const category = await result.json();
        const { meals } = category;
        console.log(meals);
        return setCategoriesMeal(meals.slice(0, MAX_CATEGORY));
      }
      if (pathname === '/bebidas') {
        const URL_API_MEALS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const result = await fetch(URL_API_MEALS);
        const category = await result.json();
        const { drinks } = category;
        console.log(drinks);
        return setCategoriesMeal(drinks.slice(0, MAX_CATEGORY));
      }
    };
    getCategoriesMeals();
  }, [pathname]);

  return (
    <div>
      {categoriesMeals.map((item, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${item.strCategory}-category-filter` }
        >
          {item.strCategory}
        </button>
      ))}
    </div>
  );
}
