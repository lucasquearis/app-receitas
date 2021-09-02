import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDataContext } from '../../context/DataProvider';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ExploreByIngredients() {
  const history = useHistory();
  const { ingredients, loading } = useDataContext();

  const types = history.location.pathname.includes('/comidas')
    ? { type: 'food', url: '/comidas' }
    : { type: 'drinks', url: '/bebidas' };

  // Cria os cards de ingredientes;
  const maxLength = 12;
  const ingredientsCards = () => ingredients[types.type].slice(0, maxLength)
    .map((ingredient, index) => (
      <section
        data-testid={ `${index}-ingredient-card` }
        key={ index }
      >
        <Link to={ `${types.url}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={
              types.type === 'food'
                ? `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`
                : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`
            }
            alt={ ingredient.strIngredient || ingredient.strIngredient1 }
          />
          <h4 data-testid={ `${index}-card-name` }>
            { ingredient.strIngredient || ingredient.strIngredient1 }
          </h4>
        </Link>
      </section>
    ));

  return (
    <div>
      <Header>Explorar Ingredientes</Header>
      { loading ? <h1>Carregando...</h1> : ingredientsCards() }
      <Footer />
    </div>
  );
}
