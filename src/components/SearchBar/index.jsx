import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../IconBtn';
import RadioInput from '../RadioInput';
import TextInput from '../TextInput';
import './style.css';

function SearchBar() {
  const [searchInputs, setSearchInputs] = useState(false);
  const [formInputs, setFormInput] = useState({});

  const handleClick = () => {
    if (searchInputs) {
      setSearchInputs(false);
    } else {
      setSearchInputs(true);
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

            <button type="button" data-testid="exec-search-btn">Buscar</button>
          </form>
        )
      }
    </>
  );
}

export default SearchBar;
