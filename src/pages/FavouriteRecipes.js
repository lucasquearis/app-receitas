import React from 'react';
import { Button } from '../components';
import Header from '../components/Header';

const FavouriteRecipes = () => {
  console.log('favoritas');
  return (
    <>
      <Header title="Receitas Favoritas" />

      <Button
        type="button"
        id="filter-by-all-btn"
        buttonText="All"
        // onClick={ handleFilterClick }
      />

      <Button
        type="button"
        id="filter-by-food-btn"
        buttonText="Foods"
        // onClick={ handleFilterClick }
      />

      <Button
        type="button"
        id="filter-by-drink-btn"
        buttonText="Foods"
        // onClick={ handleFilterClick }
      />

    </>
  );
};

export default FavouriteRecipes;
