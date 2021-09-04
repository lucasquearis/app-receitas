import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context';
import './componentCSS/Categories.css';

export default function Categories() {
  const { setFeed, setFeedDataFilter } = useContext(MyContext);
  const [categoriesMeals, setCategoriesMeal] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;
  const [resetFilter, setResetFilter] = useState('');

  useEffect(() => {
    const getCategoriesMeals = async () => {
      const MAX_CATEGORY = 5;
      if (pathname === '/comidas') {
        const URL_API_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const result = await fetch(URL_API_MEALS);
        const category = await result.json();
        const { meals } = category;
        return setCategoriesMeal(meals.slice(0, MAX_CATEGORY));
      }
      if (pathname === '/bebidas') {
        const URL_API_MEALS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const result = await fetch(URL_API_MEALS);
        const category = await result.json();
        const { drinks } = category;
        return setCategoriesMeal(drinks.slice(0, MAX_CATEGORY));
      }
    };
    getCategoriesMeals();
  }, [pathname]);

  const categoryChoose = async (target) => {
    const MAX_CATEGORY = 12;
    if (pathname === '/comidas') {
      const URL_API_MEALS = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target}`;
      const result = await fetch(URL_API_MEALS);
      const chooseCategory = await result.json();
      const { meals } = chooseCategory;
      return setFeed(meals.slice(0, MAX_CATEGORY));
    }
    if (pathname === '/bebidas') {
      const URL_API_MEALS = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target}`;
      const result = await fetch(URL_API_MEALS);
      const chooseCategory = await result.json();
      const { drinks } = chooseCategory;
      return setFeed(drinks.slice(0, MAX_CATEGORY));
    }
  };

  const toggleFunc = ({ target }) => {
    if (resetFilter === target.name && pathname === '/comidas') {
      setResetFilter('');
      setFeedDataFilter([]);
    }
    if (resetFilter === target.name && pathname === '/bebidas') {
      setResetFilter('');
      setFeedDataFilter([]);
    }
    if (resetFilter !== target.name) {
      setResetFilter(target.name);
      categoryChoose(target.name);
    }
  };

  return (
    <div className="category-container">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setFeedDataFilter([]) }

      >
        ALL

      </button>
      {categoriesMeals.map((item, index) => (
        <button
          type="button"
          name={ item.strCategory }
          key={ index }
          data-testid={ `${item.strCategory}-category-filter` }
          onClick={ (e) => toggleFunc(e) }
        >
          {item.strCategory}
        </button>
      ))}
    </div>
  );
}
