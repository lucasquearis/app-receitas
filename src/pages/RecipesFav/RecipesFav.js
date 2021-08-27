import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Filters from '../../components/RecipesDone/Filters';
import CardList from '../../components/RecipesFav/CardList';
import { useData } from '../../Context/DataContext';
import useFilter from '../../hooks/useFilter';
import './RecipesFav.css';

function RecipesFav() {
  const { fav, setFav } = useData();
  const { filteredArray, setFilter } = useFilter(fav);
  useEffect(() => {
    const getFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFav(getFavRecipes);
  }, [setFav]);
  if (!filteredArray) {
    return (
      <div className="rf-container">
        <Header title="Receitas Favoritas" />
        <p className="container-vazio">Você ainda não favoritou nenhuma receita</p>
      </div>
    );
  }
  return (
    <div className="rf-container">
      <Header title="Receitas Favoritas" />
      <Filters setFilter={ setFilter } />
      <CardList filteredArray={ filteredArray } />
    </div>
  );
}

export default RecipesFav;
