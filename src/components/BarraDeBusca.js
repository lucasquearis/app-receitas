import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  fetchApi,
  INGREDIENT_MEALS,
  INGREDIENT_DRINKS,
  NAME_MEALS,
  NAME_DRINKS,
  FIRSTLETTER_MEALS,
  FIRSTLETTER_DRINKS,

} from '../services';
import AppContext from '../context/AppContext';

function BarraDeBusca() {
  const [bar, setBar] = useState({
    text: '',
    radio: '',
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setBar({
      ...bar,
      [name]: value,
    }); // name do input identifica qual estado local será atualizado, se será o text(primeiro input) ou radio(os outros inputs).
  };
  const { pathname } = useLocation();
  const history = useHistory();
  const { setRecipes } = useContext(AppContext); // vou usar 3 funções parecidas onde irei atualizar o estado G. recipes com o que vier dessas novas APIs e aí  o map renderiza essa recipes atualizada(no arquivo EstruturaPrincipal.js)

  function verify(response) { // analise o que vem da API e verifica se iremos atualizar o estado G. ou redirecionar
    const urlHistory = pathname.split('/')[1];
    const ternario = (pathname === '/comidas') ? 'Meal' : 'Drink';
    const notFound = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    if (response === null) {
      return global.alert(notFound);
    }
    if (response.length === 1) {
      return history.push(`/${urlHistory}/${response[0][`id${ternario}`]}`);
    }
    setRecipes(response); // pegar apenas o array dentro de 'meals' ou 'drinks' que estão na api. O MAP feito no arquivo EstruturaPrincipal não vai renderizar toda a chave que vem na API, aí a aplicação quebra.
  }

  const fetchIngredients = async () => {
    const { text } = bar; // já contendo o valor do que foi digitado no primeiro input.
    const url = (pathname === '/comidas') ? INGREDIENT_MEALS : INGREDIENT_DRINKS;
    const response = await fetchApi(`${url}${text}`);
    verify(response[(pathname === '/comidas') ? 'meals' : 'drinks']);
  };

  const fetchName = async () => {
    const { text } = bar;
    const url = (pathname === '/comidas') ? NAME_MEALS : NAME_DRINKS;
    const response = await fetchApi(`${url}${text}`);
    // setRecipes(response[(pathname === '/comidas') ? 'meals' : 'drinks']);
    verify(response[(pathname === '/comidas') ? 'meals' : 'drinks']);
  };

  const fetchFirstLetter = async () => {
    const { text } = bar;
    const url = (pathname === '/comidas') ? FIRSTLETTER_MEALS : FIRSTLETTER_DRINKS;
    const response = await fetchApi(`${url}${text}`);
    // setRecipes(response[(pathname === '/comidas') ? 'meals' : 'drinks']);
    verify(response[(pathname === '/comidas') ? 'meals' : 'drinks']);
  };

  const handleClick = () => {
    if (bar.radio === 'ingredient') {
      fetchIngredients();
    } else if (bar.radio === 'name') {
      fetchName();
    } else {
      const { text } = bar;
      const sentence = 'Sua busca deve conter somente 1 (um) caracter';
      return (text.length > 1) ? global.alert(sentence) : fetchFirstLetter();
    }
  };
  return (
    <div>

      <input
        type="text"
        name="text"
        data-testid="search-input"
        placeholder="Busque alguma receita"
        onChange={ handleChange }
      />
      <input
        type="radio"
        name="radio"
        data-testid="ingredient-search-radio"
        onChange={ handleChange }
        value="ingredient"
      />
      Ingredientes
      <input
        type="radio"
        name="radio"
        data-testid="name-search-radio"
        onChange={ handleChange }
        value="name"
      />
      Nome
      <input
        type="radio"
        name="radio"
        data-testid="first-letter-search-radio"
        onChange={ handleChange }
        value="first-letter"
      />
      Primeira Letra
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>

  );
}

export default BarraDeBusca;
