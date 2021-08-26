import React from 'react';
import { useHistory } from 'react-router-dom';
import SearchHeader from '../../components/SearchHeader';
import Footer from '../../components/Footer';
import { useFiltersContext } from '../../context/FiltersProvider';
import { useDataContext } from '../../context/DataProvider';

export default function Home() {
  const history = useHistory();
  const types = history.location.pathname.includes('/comidas')
    ? { type: 'food', url: '/comidas' }
    : { type: 'drinks', url: '/bebidas' };

  // Recebendo informações do provider "useFoodAndDrinksContext"
  const { data, loading } = useDataContext();
  const { redirect } = useFiltersContext();

  const first = data[types.type][0];

  // Cria os cards de comida;
  const maxLength = 12;
  const recipeCards = () => data[types.type].slice(0, maxLength)
    .map((recipe, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ recipe.idMeal || recipe.idDrink }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
        />
        <h4 data-testid={ `${index}-card-name` }>
          { recipe.strMeal || recipe.strDrink }
        </h4>
      </div>));

  return (
    <div>
      <SearchHeader>{types.type === 'food' ? 'Comidas' : 'Bebidas'}</SearchHeader>
      {/* Se não estiver carregando, exibirá os cards */}
      { loading ? <h1>Carregando...</h1> : recipeCards() }
      { redirect
        && history.push(`${types.url}/${first.idMeal || first.idDrink}`) }
      <Footer />
    </div>
  );
}
