// vitals
import React from 'react';
// components
import Header from '../components/Header';
import Footer from '../components/FooterMenu';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
// styles
import '../styles/FavoriteRecipes.css';

const favorites = [
  {
    id: '30',
    type: 'comida',
    area: 'África',
    category: 'Beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
  },
  {
    id: '17225',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Ace',
    image: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',

  },
];

function FavoriteRecipes() {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));

  const localStorageData = localStorage.getItem('favoriteRecipes');
  const recipesArray = JSON.parse(localStorageData);

  return (
    <main>
      <Header />
      <div className="filter-buttons">
        <button type="button">
          All
        </button>
        <button type="button">
          Food
        </button>
        <button type="button">
          Drinks
        </button>
      </div>
      <div className="favorites-container">
        {recipesArray.map(({ id, image, area, category, name }) => (
          <FavoriteRecipeCard
            key={ id }
            image={ image }
            area={ area }
            category={ category }
            name={ name }
          />

        ))}
      </div>
      <Footer />
    </main>
  );
}
export default FavoriteRecipes;
