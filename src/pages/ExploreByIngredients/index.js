import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDataContext } from '../../context/DataProvider';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { getFilters } from '../../services';

export default function ExploreByIngredients() {
  const history = useHistory();
  const { ingredients, loading, setLoading, setData } = useDataContext();

  const types = history.location.pathname.includes('/comidas')
    ? { type: 'food', response: 'meals', url: '/comidas' }
    : { type: 'drinks', response: 'drinks', url: '/bebidas' };

  const handleSendFilter = async (name) => {
    setLoading(true);
    const recipes = await getFilters(types.type, { filter: 'ingredient', text: name });
    setData((prevData) => ({ ...prevData, [types.type]: recipes[types.response] }));
    setLoading(false);
    history.push(`${types.url}`);
  };

  // Cria os cards de ingredientes;
  const maxLength = 12;
  const ingredientsCards = () => ingredients[types.type].slice(0, maxLength)
    .map((ingredient, index) => (
      <button
        type="button"
        data-testid={ `${index}-ingredient-card` }
        key={ index }
        onClick={ () => (
          handleSendFilter(ingredient.strIngredient || ingredient.strIngredient1)
        ) }
      >
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
      </button>
    ));

  return (
    <div>
      <Header>Explorar Ingredientes</Header>
      { loading ? <h1>Carregando...</h1> : ingredientsCards() }
      <Footer />
    </div>
  );
}
