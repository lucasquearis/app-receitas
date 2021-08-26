import React, { useEffect, useState, useCallback } from 'react';
import ButtonCategories from './ButtonCategories';
import DrinkCard from './DrinkCard';

function FoodList() {
  const [drinks, setDrinks] = useState('');
  const [categories, setCategories] = useState('');
  const [toggle, setToggle] = useState(false);
  const [press, setPress] = useState('');
  const DOZE = 12;
  const CINCO = 5;

  const fetchDrinks = useCallback(async () => {
    const endpointdrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(endpointdrinks);
    const response = await request.json();
    setDrinks(response);
  }, []);

  const fetchCategories = useCallback(async () => {
    const endpointdrinksCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const requestCat = await fetch(endpointdrinksCategory);
    const responseCat = await requestCat.json();
    setCategories(responseCat);
  }, []);

  const fetchCategoryDrink = useCallback(async (value) => {
    const endpointdrinksCategoryDrink = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;
    const requestCatDrink = await fetch(endpointdrinksCategoryDrink);
    const responseCatDrink = await requestCatDrink.json();
    setDrinks(responseCatDrink);
  }, []);

  const handleClick = (target) => {
    if (toggle === false) {
      setPress(target.value);
      fetchCategoryDrink(target.value);
      setToggle(true);
    } else if (press === target.value) {
      fetchDrinks();
      setToggle(false);
    } else {
      fetchCategoryDrink(target.value);
      setToggle(true);
    }
  };

  useEffect(() => {
    fetchDrinks();
    fetchCategories();
  }, [fetchDrinks, fetchCategories]);

  if (drinks !== '' && categories !== '') {
    return (
      <div>
        <ButtonCategories
          handleClick={ fetchDrinks }
          dataID="All-category-filter"
          value="All"
        />
        {categories.drinks.slice(0, CINCO).map((cat) => (<ButtonCategories
          key={ cat.strCategory }
          handleClick={ handleClick }
          dataID={ `${cat.strCategory}-category-filter` }
          value={ cat.strCategory }
        />))}
        <ol>
          {drinks.drinks.slice(0, DOZE).map((drink, index) => (
            <DrinkCard key={ drinks.idDrink } drink={ drink } index={ index } />
          ))}
        </ol>
      </div>
    );
  } return (
    <div>
      Loading...
    </div>
  );
}
export default FoodList;
