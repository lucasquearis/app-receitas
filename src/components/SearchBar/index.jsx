import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import GenericBtn from '../GenericBtn';
import RadioInput from '../RadioInput';
import TextInput from '../TextInput';
import './style.css';
import {
  fetchFoodByFirstLetter,
  fetchFoodByIngredient,
  fetchFoodByName,
  fetchDrinkByFirstLetter,
  fetchDrinkByIngredient,
  fetchDrinkByName,
} from '../../redux/actions/foodActions';

function SearchBar({ title, searchInputs }) {
  const [formInputs, setFormInput] = useState({});
  const dispatch = useDispatch();

  const handleChange = ({ target: { value, type, name, checked } }) => {
    if (type === 'checkbox') {
      setFormInput({ ...formInputs, [name]: checked });
    } else {
      setFormInput({ ...formInputs, [name]: value });
    }
  };

  const handleFoodSubmit = ({ searchInput, selectedSearch }) => {
    switch (selectedSearch) {
    case 'ingredient':
    {
      const ingredient = searchInput.replace(' ', '_').toLowerCase();
      return dispatch(fetchFoodByIngredient(ingredient));
    }
    case 'name':
    {
      const name = searchInput.replace(' ', '_').toLowerCase();
      return dispatch(fetchFoodByName(name));
    }
    case 'firstLetter':
    {
      if (searchInput.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const firstLetter = searchInput.charAt(0).toLowerCase();
      return dispatch(fetchFoodByFirstLetter(firstLetter));
    }
    default:
      return true;
    }
  };

  const handleDrinkSubmit = ({ searchInput, selectedSearch }) => {
    switch (selectedSearch) {
    case 'ingredient':
    {
      const ingredient = searchInput.replace(' ', '_').toLowerCase();
      return dispatch(fetchDrinkByIngredient(ingredient));
    }
    case 'name':
    {
      const name = searchInput.replace(' ', '_').toLowerCase();
      return dispatch(fetchDrinkByName(name));
    }
    case 'firstLetter':
    {
      if (searchInput.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const firstLetter = searchInput.charAt(0).toLowerCase();
      return dispatch(fetchDrinkByFirstLetter(firstLetter));
    }
    default:
      return true;
    }
  };

  const searchInputProps = {
    id: 'search-input',
    onChange: handleChange,
    dataId: 'search-input',
    placeholder: 'Digite sua busca',
    name: 'searchInput',
  };

  const ingredientsRadioProps = {
    id: 'ingredient-search-radio',
    onChange: handleChange,
    dataId: 'ingredient-search-radio',
    name: 'selectedSearch',
    value: 'ingredient',
    label: 'Ingrediente',
  };

  const nameRadioProps = {
    id: 'name-search-radio',
    onChange: handleChange,
    dataId: 'name-search-radio',
    name: 'selectedSearch',
    value: 'name',
    label: 'Nome',
  };

  const firstLetterRadioProps = {
    id: 'first-letter-search-radio',
    onChange: handleChange,
    dataId: 'first-letter-search-radio',
    name: 'selectedSearch',
    value: 'firstLetter',
    label: 'Primeira Letra',
  };

  const searchBtn = {
    dataId: 'exec-search-btn',
    value: 'Buscar',
    onClick: () => {
      if (title.toLowerCase() === 'comidas') {
        handleFoodSubmit(formInputs);
      } if (title.toLowerCase() === 'bebidas') {
        handleDrinkSubmit(formInputs);
      }
    },
  };

  return (
    <div className="search-bar">
      {
        searchInputs && (
          <form>
            <TextInput { ...searchInputProps } />
            <RadioInput { ...ingredientsRadioProps } />
            <RadioInput { ...nameRadioProps } />
            <RadioInput { ...firstLetterRadioProps } />
            <GenericBtn { ...searchBtn } />
          </form>)
      }
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default SearchBar;
