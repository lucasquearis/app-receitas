import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import './style.css';
import { useLocation } from 'react-router-dom';
import { getFood } from '../../services/foodAPI';
import {
  FOOD_ERROR_RESPONSE,
  FOOD_RESPONSE,
  NEW_FOOD_SEARCH } from '../../redux/reducers/foodReducer';
import {
  DRINK_ERROR_RESPONSE,
  DRINK_RESPONSE,
  NEW_DRINK_SEARCH } from '../../redux/reducers/drinkReducer';
import { getDrink } from '../../services/drinkAPI';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState(null);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const searchForFood = async () => {
    try {
      dispatch({ type: NEW_FOOD_SEARCH });
      const response = await getFood(searchTerm, searchType);
      dispatch({ type: FOOD_RESPONSE, payload: response });
    } catch (error) {
      console.log(error);
      dispatch({ type: FOOD_ERROR_RESPONSE });
    }
  };

  const searchForDrink = async () => {
    try {
      dispatch({ type: NEW_DRINK_SEARCH });
      const response = await getDrink(searchTerm, searchType);
      dispatch({ type: DRINK_RESPONSE, payload: response });
    } catch (error) {
      console.log(error);
      dispatch({ type: DRINK_ERROR_RESPONSE });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchType === 'Primeira Letra'
        && searchTerm.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (pathname.includes('comidas')) {
      searchForFood();
    } else if (pathname.includes('bebidas')) {
      searchForDrink();
    }
  };

  return (
    <Form className="search-bar" onSubmit={ handleSubmit }>
      <Form.Control
        type="text"
        className="mb-2"
        placeholder="Buscar Receita"
        data-testid="search-input"
        value={ searchTerm }
        onChange={ ({ target: { value } }) => setSearchTerm(value) }
      />
      <div className="inline-radios mx-auto">
        <Form.Check
          inline
          data-testid="ingredient-search-radio"
          label="Ingrediente"
          name="group1"
          type="radio"
          value="Ingrediente"
          onChange={ ({ target: { value } }) => setSearchType(value) }
        />
        <Form.Check
          inline
          data-testid="name-search-radio"
          label="Nome"
          name="group1"
          type="radio"
          value="Nome"
          onChange={ ({ target: { value } }) => setSearchType(value) }
        />
        <Form.Check
          inline
          data-testid="first-letter-search-radio"
          label="Primeira Letra"
          name="group1"
          type="radio"
          value="Primeira Letra"
          onChange={ ({ target: { value } }) => setSearchType(value) }
        />
      </div>
      <Button
        type="submit"
        className="mt-2"
        variant="primary"
        data-testid="exec-search-btn"
        disabled={ !searchType }
      >
        Buscar
      </Button>
    </Form>
  );
};

export default SearchBar;
