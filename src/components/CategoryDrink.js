import React, { useEffect, useState } from 'react';
import CardDrink from './CardDrink';

function CategoryDrink() {
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const maxCategories = 5;
  const maxList = 12;

  useEffect(() => {
    const getDrinks = async () => {
      const drinkApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(drinkApi).then((data) => data.json());
      setDrinkRecipes(drinks);
    };

    const getCategories = async () => {
      const drinkApiCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const { drinks } = await fetch(drinkApiCategories).then((data) => data.json());
      setDrinkCategories(drinks);
    };

    getDrinks();
    getCategories();
  }, []);

  const handleClick = ({ target }) => {
    const getDrinks = async () => {
      const drinkApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${target.value}`;
      const { drinks } = await fetch(drinkApi).then((data) => data.json());
      setDrinkRecipes(drinks);
    };
    getDrinks();
  };

  const categoriesBtn = () => {
    const categoryBtn = drinkCategories.slice(0, maxCategories).map(({ strCategory }) => (
      <button
        data-testid={ `${strCategory}-category-filter` }
        type="button"
        key={ strCategory }
        value={ strCategory }
        onClick={ handleClick }
      >
        { strCategory }
      </button>
    ));
    return categoryBtn;
  };

  return (
    <div>
      <div>
        <button type="button" value="" onClick={ handleClick }>
          All
        </button>
        { categoriesBtn() }
      </div>
      <div>
        { drinkRecipes
          && drinkRecipes.slice(0, maxList).map((drink, index) => (
            <CardDrink key={ drink.idDrink } drink={ drink } i={ index } />)) }
      </div>
    </div>
  );
}

export default CategoryDrink;
