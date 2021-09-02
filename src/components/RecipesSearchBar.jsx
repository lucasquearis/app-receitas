import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import MyContext from '../context/MyContext';
import * as fetchAPI from '../service/fetchAPI';
import './searchBar.css';

function RecipesSearchBar() {
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const newFoodRecipes = useContext(MyContext);

  const handleChange = ({ target }) => {
    const { id, value: word, name } = target;
    if (name === 'newSearch') {
      setSearch(word);
    } else {
      setType(id);
    }
  };

  const warning = () => {
    if (type === 'firstLetter' && search.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleClick = async () => {
    warning();
    const recipes = await fetchAPI.filteredRecipes(type, search);
    setData(recipes === null ? [] : recipes);
    if (recipes === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    newFoodRecipes(recipes === null ? [] : recipes);
    console.log('renderizou');
  };

  if (data.length === 1) return <Redirect to={ `/comidas/${data[0].idMeal}` } />;

  return (
    <Form className="formSearchBar">
      <Form.Control
        name="newSearch"
        data-testid="search-input"
        type="text"
        onChange={ handleChange }
      />
      <Form.Label htmlFor="filter">
        <div className="mb-3">
          <Form.Check
            inline
            label="Ingrediente"
            id="ingredient"
            name="filter"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
          <Form.Check
            inline
            label="Nome"
            id="name"
            name="filter"
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
          <Form.Check
            inline
            label="Primeira Letra"
            id="firstLetter"
            name="filter"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
        </div>
      </Form.Label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </Form>
  );
}

export default RecipesSearchBar;
