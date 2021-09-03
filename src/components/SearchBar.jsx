import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import mainFetch from '../fetchs/mainFetch';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { pathname } = useLocation();
  const history = useHistory();
  const [pesquisa, setPesquisa] = useState('');
  const [tipo, setTipo] = useState('');
  const { setDataMeals,
    setDataDrinks,
    setRenderFoods,
    setRenderDrinks,
  } = useContext(MyContext);

  const handeChange = ({ target }) => {
    if (target.name === 'pesquisa') {
      setPesquisa(target.value);
    } else { setTipo(target.id); }
  };

  const aviso = () => {
    if (tipo === 'primeiraLetra' && pesquisa.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const foodConditions = (meals) => {
    if (meals === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (meals.length === 1) {
      history.push(`/comidas/${meals[0].idMeal}`);
    }
  };

  const drinkConditions = (drinks) => {
    if (drinks === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (drinks.length === 1) {
      history.push(`/bebidas/${drinks[0].idDrink}`);
    }
  };

  const handleSubmit = async () => {
    aviso();
    if (pathname === '/comidas') {
      const type = 'food';
      const { meals } = await mainFetch(type, tipo, pesquisa);
      setDataMeals(meals);
      foodConditions(meals);
      setRenderFoods(true);
    }
    if (pathname === '/bebidas') {
      const type = 'drink';
      const { drinks } = await mainFetch(type, tipo, pesquisa);
      setDataDrinks(drinks);
      drinkConditions(drinks);
      setRenderDrinks(true);
    }
  };
  return (
    <div className="serchBar">
      <input
        data-testid="search-input"
        name="pesquisa"
        type="text"
        onChange={ handeChange }
      />
      <label htmlFor="filter">
        <input
          id="ingredientes"
          name="filter"
          type="radio"
          data-testid="ingredient-search-radio"
          onChange={ handeChange }
        />
        Ingrediente
        <input
          id="procuraComida"
          name="filter"
          type="radio"
          data-testid="name-search-radio"
          onChange={ handeChange }
        />
        Nome
        <input
          id="primeiraLetra"
          name="filter"
          type="radio"
          data-testid="first-letter-search-radio"
          onChange={ handeChange }
        />
        Primeira Letra
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSubmit }
        >
          Buscar
        </button>
      </label>
    </div>
  );
}

export default SearchBar;
