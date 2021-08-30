import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

export default function DoneRecipes() {
  const [filterRecipes, setFilterRecipes] = useState({
    filterMeals: false,
    filterDrinks: false,
  });

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(getFavorites);
  }, []);

  const { filterMeals, filterDrinks } = filterRecipes;

  const filterFavorites = () => {
    if (filterMeals) return favoriteRecipes.filter(({ type }) => type === 'comida');
    if (filterDrinks) return favoriteRecipes.filter(({ type }) => type === 'bebida');
    return favoriteRecipes;
  };

  useEffect(() => {
    filterFavorites();
  }, [favoriteRecipes]);

  const handleFavoriteRemove = (name) => {
    setFavoriteRecipes(favoriteRecipes.filter((favorite) => favorite.name !== name));
  };

  return (
    <>
      <Header title="Receitas Favoritas" search={ false } />
      <FilterButtons setFilterRecipes={ setFilterRecipes } />
      <section>
        {
          filterFavorites().map(({
            id,
            area,
            category,
            alcoholicOrNot,
            name,
            image,
            type,
          },
          index) => (
            <FavoriteRecipeCard
              key={ id }
              area={ area }
              category={ category }
              alcoholic={ alcoholicOrNot }
              drink={ name }
              meal={ name }
              name={ name }
              thumb={ image }
              type={ type === 'comida' ? 'meals' : 'drinks' }
              index={ index }
              id={ id }
              handleFavoriteRemove={ handleFavoriteRemove }
            />
          ))
        }
      </section>
    </>
  );
}
