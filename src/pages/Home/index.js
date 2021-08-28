import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchHeader from './SearchHeader';
import Footer from '../../components/Footer';
import { useDataContext } from '../../context/DataProvider';

export default function Home() {
  const history = useHistory();
  const { data, loading } = useDataContext();

  const types = history.location.pathname.includes('/comidas')
    ? { type: 'food', url: '/comidas' }
    : { type: 'drinks', url: '/bebidas' };

  // Cria os cards de comida;
  const maxLength = 12;
  const recipeCards = () => data[types.type].slice(0, maxLength)
    .map((recipe, index) => (
      <section
        key={ recipe.idMeal || recipe.idDrink }
        data-testid={ `${index}-recipe-card` }
      >
        <Link to={ `${types.url}/${recipe.idMeal || recipe.idDrink}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
          <h4 data-testid={ `${index}-card-name` }>
            { recipe.strMeal || recipe.strDrink }
          </h4>
        </Link>
      </section>
    ));

  return (
    <div>
      <SearchHeader>{types.type === 'food' ? 'Comidas' : 'Bebidas'}</SearchHeader>
      { loading ? <h1>Carregando...</h1> : recipeCards() }
      <Footer />
    </div>
  );
}
