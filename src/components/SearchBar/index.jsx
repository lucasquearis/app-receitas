import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GenericBtn from '../GenericBtn';
import IconBtn from '../IconBtn';
import RadioInput from '../RadioInput';
import TextInput from '../TextInput';
import './style.css';
import {
  fetchFoodByFirstLetter,
  fetchFoodByIngredient,
  fetchFoodByName,
} from '../../redux/actions/foodActions';

function SearchBar() {
  const [searchInputs, setSearchInputs] = useState(false);
  const [formInputs, setFormInput] = useState({});
  const dispatch = useDispatch();

  const handleClick = () => {
    if (searchInputs) {
      setSearchInputs(false);
    } else {
      setSearchInputs(true);
    }
  };

  const handleSubmit = ({ searchInput, selectedSearch }) => {
    console.log(selectedSearch, searchInput);
    switch (selectedSearch) {
    case 'ingredients':
      return dispatch(fetchFoodByIngredient(searchInput));
    case 'name':
      return dispatch(fetchFoodByName(searchInput));
    case 'firstLetter':
      return dispatch(fetchFoodByFirstLetter(searchInput));
    default:
      return true;
    }
  };

  const handleChange = ({ target: { value, type, name, checked } }) => {
    if (type === 'checkbox') {
      setFormInput({ ...formInputs, [name]: checked });
    } else {
      setFormInput({ ...formInputs, [name]: value });
    }
  };

  const searchBtnProps = {
    onClick: handleClick,
    dataId: 'search-top-btn',
    src: '/images/searchIcon.svg',
    alt: 'search-button',
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
    onClick: () => handleSubmit(formInputs),
  };

  return (
    <>
      <IconBtn { ...searchBtnProps } />
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
    </>
  );
}

export default SearchBar;
