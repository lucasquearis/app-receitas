import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Button from '../components/Button';
import DoneFoodCard from '../components/DoneFoodCard';
import DoneDrinkCard from '../components/DoneDrinkCard';

const FinishedRecipes = () => {
  const [filter, setFilter] = useState('');

  let actualStorage = [];
  actualStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  if (actualStorage === null) actualStorage = [];

  const filterStorage = () => {
    let copyStorage = [...actualStorage];
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
        <p data-testid="page-title">Receitas Feitas</p>
      </div>
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
      { filterStorage().map((recipe, index) => (recipe.type === 'comida'
        ? <DoneFoodCard recipe={ recipe } index={ index } />
        : <DoneDrinkCard recipe={ recipe } index={ index } />))}
    </div>
  );
};

export default FinishedRecipes;
