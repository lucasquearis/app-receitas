// vitals
import React from 'react';
// components
import Header from '../components/Header';
import Footer from '../components/FooterMenu';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
// styles
import '../styles/FavoriteRecipes.css';

// remover isso aqui, só serve pra simular localstorage
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
  {
    alcoholicOrNot: 'Optional alcohol',
    area: '',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    type: 'bebida',

  },
  {
    alcoholicOrNot: 'Non alcoholic',
    area: '',
    category: 'Cocoa',
    id: '12744',
    image: 'https://www.thecocktaildb.com/images/media/drink/8y4x5f1487603151.jpg',
    name: 'Microwave Hot Cocoa',
    type: 'bebida',
  },
];

function FavoriteRecipes() {
  // retirar esta linha, só serve pra simular algo que já está no localstorage
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
        {recipesArray ? recipesArray
          .map(({ id, alcoholicOrNot, area, category, image, name, type }) => (
            <FavoriteRecipeCard
              key={ id }
              alcoholicOrNot={ alcoholicOrNot }
              area={ area }
              category={ category }
              image={ image }
              name={ name }
              type={ type }
            />

          )) : <h4>Sem favoritos salvos.</h4>}
      </div>
      <Footer />
    </main>
  );
}
export default FavoriteRecipes;
