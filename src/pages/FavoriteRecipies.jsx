import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';

function FavoriteRecipies() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const local = JSON.parse(localStorage.getItem('favoriteFood'));
  setFavoriteRecipes(local);

  const filterType = (type) => {
    if (type === 'all') {
      setFavoriteRecipes(favoriteRecipes);
    } else {
      const filteredFood = favoriteRecipes.filter((item) => item.type === type);
      setFavoriteRecipes(filteredFood);
    }
  };
  return (
    <div>
      <Header title="Receitas Feitas" />
      <Button
        onClick={ () => filterType('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </Button>
      <Button
        data-testid="filter-by-food-btn"
        onClick={ () => filterType('comida') }
      >
        Food
      </Button>
      <Button
        data-testid="filter-by-drink-btn"
        onClick={ () => filterType('bebida') }
      >
        Drinks
      </Button>
      {favoriteRecipes.map((item) => (
        <FavoriteRecipesCard
          key={ item.id }
          id={ item.id }
          type={ item.type }
          category={ item.category }
          alcoholicOrNot={ item.alcoholicOrNot }
          name={ item.name }
          image={ item.image }
          area={ item.area }
        />))}
    </div>
  );
}

export default FavoriteRecipies;
