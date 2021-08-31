import React, { useState, useContext, useEffect } from 'react';
import FoodContext from '../context/FoodContext';
import Button from '../components/Button';
import FavoriteFoodCard from '../components/FavoriteFoodCard';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';
import profileIcon from '../images/profileIcon.svg';

const FavoriteRecipes = () => {
  const { changed } = useContext(FoodContext);
  const [storage, setStorage] = useState([]);
  const [filter, setFilter] = useState('');
  console.log(storage);

  useEffect(() => {
    const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setStorage(actualStorage);
  }, [changed]);

  if (filter) {
    if (filter === 'All') return storage;
    if (filter === 'Food') storage.filter((item) => item.type === 'comida');
    if (filter === 'Drinks') storage.filter((item) => item.type === 'bebida');
  }

  const handleClick = (value) => {
    setFilter(value);
  };

  return (
    <div>
      <div>
        <button type="button">
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>
        <h2 data-testid="page-title">Receitas Favoritas</h2>
        <Button
          btnText="All"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClick('All') }
        />
        <Button
          btnText="Food"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClick('Food') }
        />
        <Button
          btnText="Drinks"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClick('Drinks') }
        />
      </div>
      { storage.map((recipe, index) => (recipe.type === 'comida'
        ? <FavoriteFoodCard recipe={ recipe } index={ index } />
        : <FavoriteDrinkCard recipe={ recipe } index={ index } />))}
    </div>
  );
};

export default FavoriteRecipes;
