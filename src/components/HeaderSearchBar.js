import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import genericFetchAPI from '../services/genericFetchAPI';
// import CardFood from './CardFood';
// import CardDrink from './CardDrink';

function HeaderSearchBar() {
  const { pathname } = useLocation();
  // const history = useHistory();

  // const [fetch, setFetch] = useState(false);
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
    if (data.length) return console.log(data.response);
  }, [data]);

  async function handleClick() {
    // const maxList = 12;
    const { mealOrCocktail, type, inicio, search } = state;
    if (inicio === 'f' && search.length === 1) {
      const response = await genericFetchAPI(mealOrCocktail, type, inicio, search);
      setData({ response });
    } else if (inicio === 'f' && search.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const response = await genericFetchAPI(mealOrCocktail, type, inicio, search);
    setData({ response });
  }

  // useEffect(() => {
  //   async function fetchAPI() {
  //     const { mealOrCocktail, type, inicio, search } = state;
  //     const response = await genericFetchAPI(mealOrCocktail, type, inicio, search);
  //     setData({ response });
  //   }
  //   fetchAPI();
  // }, [fetch]);

  // function handleClick() {
  //   const { inicio, search } = state;
  //   if (inicio === 'f' && search.length === 1) {
  //     setFetch(true);
  //   } else if (inicio === 'f' && search.length > 1) {
  //     global.alert('Sua busca deve conter somente 1 (um) caracter');
  //   } else {
  //     setFetch(true);
  //   }
  // }

  const { filter } = state;

  return (
    <div>
      <section>
        <button
          type="button"
          data-testid="search-top-btn"
        >
          teste
        </button>
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
      {/* {pathname === '/comidas' ? (
        mealList.slice(0, maxList).map((meal, index) => (
          <CardFood key={ index } meal={ meal } />
        ))
      ) : (
        drinkList.slice(0, maxList).map((drink, index) => (
          <CardDrink key={ index } drink={ drink } />
        ))
      )} */}
    </div>
  );
}

export default HeaderSearchBar;
