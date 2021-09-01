import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Button from '../components/Button';
import FavoriteFoodCard from '../components/FavoriteFoodCard';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';
import profileIcon from '../images/profileIcon.svg';

const FavoriteRecipes = () => {
  const { changed } = useContext(AppContext);
  const [storage, setStorage] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let storageItems = '';
    if (actualStorage) {
      storageItems = actualStorage;
    }
    setStorage(storageItems);
  }, [changed]);

  const filterStorage = () => {
    let copyStorage = [...storage];
    if (filter === 'Food') {
      copyStorage = copyStorage.filter((item) => item.type === 'comida');
    }
    if (filter === 'Drinks') {
      copyStorage = copyStorage.filter((item) => item.type === 'bebida');
    }
    return copyStorage;
  };

  const handleClick = (value) => {
    setFilter(value);
  };

  return (
    <div>
      <div>
        <Link to="/perfil">
          <button type="button">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </button>
        </Link>
        <h2 data-testid="page-title">Receitas Favoritas</h2>
      </div>
      <div>
        <Button
          btnText="All"
          datatestId="filter-by-all-btn"
          onClick={ () => handleClick('All') }
        />
        <Button
          btnText="Food"
          datatestId="filter-by-food-btn"
          onClick={ () => handleClick('Food') }
        />
        <Button
          btnText="Drinks"
          datatestId="filter-by-drink-btn"
          onClick={ () => handleClick('Drinks') }
        />
      </div>
      { filterStorage().map((recipe, index) => (recipe.type === 'comida'
        ? <FavoriteFoodCard recipe={ recipe } index={ index } />
        : <FavoriteDrinkCard recipe={ recipe } index={ index } />))}
    </div>
  );
};

export default FavoriteRecipes;
