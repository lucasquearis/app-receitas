import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import './ReceitasFavoritas.css';
import FavoriteCards from '../Components/FavoriteCards';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

export default function Perfil() {
  const [favorites, setFavorites] = useState([]);
  const [favoritesFiltered, setFavoritesFiltered] = useState([]);

  useEffect(() => {
    const getFavorites = () => {
      const favoritesResults = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoritesResults !== null) {
        setFavorites(favoritesResults);
        setFavoritesFiltered(favoritesResults);
      }
    };

    getFavorites();
  }, []);

  const onFavoriteClick = (id) => {
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorites(newFavorites);

    const newFilter = favoritesFiltered.filter((favorite) => favorite.id !== id);
    setFavoritesFiltered(newFilter);
  };

  const onFilterClick = ({ target: { name } }) => {
    if (name === 'all') {
      setFavoritesFiltered(favorites);
      return;
    }
    if (name === 'food') {
      const newFilter = favorites.filter((favorite) => (
        favorite.type === 'comida'));

      setFavoritesFiltered(newFilter);
      return;
    }
    // bebida
    const newFilter = favorites.filter((favorite) => favorite.type === 'bebida');
    setFavoritesFiltered(newFilter);
  };

  return (
    <section>
      <Header title="Receitas Favoritas" />
      <div className="filter-section">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ onFilterClick }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          name="food"
          onClick={ onFilterClick }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="drink"
          onClick={ onFilterClick }
        >
          Drinks
        </button>
      </div>
      <div className="favorite-section">
        { favoritesFiltered.map((favorite, index) => (
          <FavoriteCards
            key={ favorite.id }
            recipe={ favorite }
            index={ index }
            onFavoriteClick={ onFavoriteClick }
          />
        )) }
      </div>
    </section>
  );
}
