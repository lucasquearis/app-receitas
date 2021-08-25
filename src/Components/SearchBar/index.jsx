import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputRadio from '../InputRadio';
import Inp from '../Inp';

import { ContextApp } from '../../Context/ContextApp';

function SearchBar() {
  const [previousSearch, setPreviousSearch] = useState({});
  const { searchRecipes } = useContext(ContextApp);

  const history = useHistory();
  const { location: { pathname } } = history;

  const currentRout = pathname.includes('comidas');
  const url = currentRout === true ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';

  const handleChange = ({ target: { name, value } }) => (
    setPreviousSearch({
      ...previousSearch,
      [name]: value,
    })
  );

  const inpProps = {
    name: 'input',
    testid: 'search-input',
    label: 'name',
    variant: 'outlined',
    type: 'text',
    handleInput: (event) => handleChange(event),
  };

  return (
    <div className="search-bar-container">
      <Inp { ...inpProps } />
      <RadioGroup
        row
        name="type"
        aria-label="gender"
        onChange={ (event) => handleChange(event) }
      >
        <InputRadio
          value="ingredient"
          label="Ingrediente"
          data-testid="ingredient-search-radio"
        />
        <InputRadio
          value="name"
          label="Nome"
          data-testid="name-search-radio"
        />
        <InputRadio
          value="first-letter"
          label="Primeira letra"
          data-testid="first-letter-search-radio"
        />
      </RadioGroup>
      <Button
        variant="contained"
        data-testid="exec-search-btn"
        onClick={ () => searchRecipes(previousSearch, currentRout, url, history) }
      >
        Pesquisar
      </Button>
    </div>
  );
}

export default SearchBar;
