import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import { useFetchCategoryApiDrinks } from '../customHooks/useFetchCategoryApi';
import { useFetchCategoryListApiDrinks } from '../customHooks/useFetchCategoryListApi';
import { useFetchApiDrinks } from '../customHooks/useFetchApi';

export default function DrinkCategoryButtons() {
  const { btnCategoryDrinks, setListCategoryDrinks,
    listCategoryDrinks } = useContext(Context);
  const [getCategoryDrinksApi] = useFetchCategoryApiDrinks();
  const [getListCategoryDrinkApi] = useFetchCategoryListApiDrinks();
  const [getDrinksApi] = useFetchApiDrinks();
  const [toggled, setToggled] = useState(false);
  const CINCO = 5;

  useEffect(() => { getCategoryDrinksApi(); }, []);
  useEffect(() => { getListCategoryDrinkApi(); }, [listCategoryDrinks]);

  const handleToggle = async () => {
    getDrinksApi();
    setToggled(!toggled);
    // setListCategoryDrinks('');
  };

  const handleClick = ({ target }) => {
    const { name } = target;
    if (toggled && listCategoryDrinks === name) { handleToggle(); } else {
      setListCategoryDrinks(name);
      setToggled(true);
    }
  };

  return (
    <ul>
      <button
        type="button"
        name="All"
        data-testid="All-category-filter"
        onClick={ handleClick }
        className="filter-button"
      >
        All
      </button>
      { btnCategoryDrinks ? (
        btnCategoryDrinks
          .filter((_item, index) => index < CINCO)
          .map((category) => (
            <button
              type="button"
              name={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ handleClick }
              key={ category.strCategory }
              className="filter-button"
            >
              { category.strCategory }
            </button>
          ))
      ) : null }
    </ul>
  );
}
