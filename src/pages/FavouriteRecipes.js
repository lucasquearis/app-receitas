import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { Button } from '../components';
import Header from '../components/Header';

const FavouriteRecipes = () => {
  const { favoriteRcps, setFavoriteRcps } = useContext(AppContext);

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
