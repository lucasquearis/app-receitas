import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDataContext } from '../../../../context/DataProvider';
import { fetchCategories } from '../../../../services';

export default function CategoryContainer() {
  const { location: { pathname } } = useHistory();
  const { setLoading, setData, categories } = useDataContext();
  const type = pathname.includes('/comidas') ? 'food' : 'drinks';

  const [currFilter, setCurrFilter] = useState('');

  const handleGetCategories = async ({ target: { value } }) => {
    setCurrFilter(value);
    setLoading(true);
    const category = value === currFilter ? '' : value;
    const recipes = await fetchCategories(type, category);
    setLoading(false);
    setData((prevData) => ({ ...prevData, [type]: recipes.meals || recipes.drinks }));
  };

  const maxLength = 5;
  const createButtons = () => categories[type].slice(0, maxLength)
    .map(({ strCategory }) => (
      <button
        key={ strCategory }
        type="button"
        value={ strCategory }
        onClick={ handleGetCategories }
        className="category-button"
        data-testid={ `${strCategory}-category-filter` }
      >
        { strCategory }
      </button>
    ));

  return (
    <div className="category-button-container">
      { createButtons() }
      <button
        type="button"
        value=""
        onClick={ handleGetCategories }
        className="category-button"
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}
