import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import genericFetchAPI from '../services/genericFetchAPI';
import CardDrink from './CardDrink';
import CardFood from './CardFood';

function HeaderSearchBar() {
  const { pathname } = useLocation();
  const history = useHistory();

  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [data, setData] = useState({});
  const [state, setState] = useState({
    mealOrCocktail: '',
    type: '',
    search: '',
    inicio: '',
    caminho: '',
    list: [],
    mealsOrDrinks: '',
    filter: '',
  });

  useEffect(() => {
    const verifyPathname = () => {
      if (pathname === '/comidas') {
        setState({ mealOrCocktail: 'meal', mealsOrDrinks: 'meals' });
      } else if (pathname === '/bebidas') {
        setState({ mealOrCocktail: 'cocktail', mealsOrDrinks: 'drinks' });
      }
    };
    verifyPathname();
  }, [pathname]);

  useEffect(() => {
    const maxList = 12;
    const resolveMeals = () => {
      if (!data.response.meals) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (data.response.meals.length === 1) {
        history.push(`/comidas/${data.response.meals[0].idMeal}`);
      } else {
        setMeals(data.response.meals.slice(0, maxList));
      }
    };
    const resolveDrinks = () => {
      if (!data.response.drinks) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (data.response.drinks.length === 1) {
        history.push(`/bebidas/${data.response.drinks[0].idDrink}`);
      } else {
        setDrinks(data.response.drinks.slice(0, maxList));
      }
    };
    const verifyMealsOrDrinks = () => {
      if (pathname === '/comidas') {
        resolveMeals();
      } else if (pathname === '/bebidas') {
        resolveDrinks();
      }
    };
    if (data.response) return verifyMealsOrDrinks();
  }, [data, pathname, history]);

  async function handleClick() {
    const { mealOrCocktail, type, inicio, search } = state;
    if (inicio === 'f' && search.length === 1) {
      const response = await genericFetchAPI(mealOrCocktail, type, inicio, search);
      setData({ response });
    } else if (inicio === 'f' && search.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } if (inicio !== 'f') {
      const response = await genericFetchAPI(mealOrCocktail, type, inicio, search);
      setData({ response });
    }
  }

  const { filter } = state;

  return (
    <div>
      <section>
        <input
          type="text"
          onChange={ ({ target: { value } }) => setState({ ...state, search: value }) }
          data-testid="search-input"
          placeholder="Buscar Receita"
        />
        <div>
          <label htmlFor="ingredient">
            Ingrediente
            <input
              id="ingredient"
              type="radio"
              name="radioFilter"
              value={ filter }
              defaultChecked={ filter === 'Ingrediente' }
              onClick={ () => {
                setState({ ...state,
                  filter: 'Ingrediente',
                  type: 'filter',
                  inicio: 'i' });
              } }
              data-testid="ingredient-search-radio"
            />
          </label>
          <label htmlFor="name">
            Nome
            <input
              id="name"
              type="radio"
              name="radioFilter"
              value={ filter }
              defaultChecked={ filter === 'Nome' }
              onClick={ () => {
                setState({ ...state,
                  filter: 'Nome',
                  type: 'search',
                  inicio: 's' });
              } }
              data-testid="name-search-radio"
            />
          </label>
          <label htmlFor="first-letter">
            Primeira Letra
            <input
              id="first-letter"
              type="radio"
              name="radioFilter"
              value={ filter }
              defaultChecked={ filter === 'PrimeiraLetra' }
              onClick={ () => {
                setState({ ...state,
                  filter: 'PrimeiraLetra',
                  type: 'search',
                  inicio: 'f' });
              } }
              data-testid="first-letter-search-radio"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={ () => handleClick() }
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </section>
      {meals.map((meal, index) => (
        <CardFood key={ meal.idMeal } meal={ meal } i={ index } />
      ))}
      {drinks.map((drink, index) => (
        <CardDrink key={ drink.idDrink } drink={ drink } i={ index } />
      ))}
    </div>
  );
}

export default HeaderSearchBar;
