import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import './ReceitasFavoritas.css';
import FavoritesCard from '../Components/FavoritesCard';

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

  useEffect(() => {
    const getFavorites = () => {
      const favoritesResults = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoritesResults !== null) {
        setFavorites(favoritesResults);
      }
    };

    getFavorites();
  }, []);

  return (
    <section>
      <Header title="Receitas Favoritas" />
      <div className="filter-section">
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </div>
      <div className="favorite-section">
        { favorites.map((favorite, index) => (
          <FavoritesCard key={ favorite.id } recipe={ favorite } index={ index } />
        )) }
      </div>
    </section>
  );
}
