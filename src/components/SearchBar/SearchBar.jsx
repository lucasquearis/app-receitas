import React from 'react';
import TextField from '@material-ui/core/TextField';
import UseSearchBar from '../../hook/UseSearchBar';
import { SearchBarForm, SearchBarLabel, SearchBarDiv,
  SearchBarButton, SearchBarRadio } from './styles';

function SearchBar() {
  const { searchObj: { searchText }, handleChange, handleClick } = UseSearchBar();

  return (
    <SearchBarForm>
      <TextField
        focused={ false }
        style={ { border: '1px solid white', borderRadius: '4px' } }
        InputLabelProps={ { style: { color: 'white',
          border: 'none',
          backgroundColor: 'rgb(128, 15, 15)',
          padding: '4px' } } }
        label="Buscar Receita"
        type="text"
        name="searchText"
        id="outlined-margin-dense"
        margin="dense"
        onChange={ handleChange }
        value={ searchText }
        variant="outlined"
        inputProps={ { 'data-testid': 'search-input',
          autocomplete: 'off',
          style: { color: 'white' } } }
      />
      <SearchBarDiv onChange={ handleChange }>
        <SearchBarLabel htmlFor="ingredient">
          <SearchBarRadio
            id="ingredient"
            type="radio"
            name="searchRadio"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </SearchBarLabel>
        <SearchBarLabel htmlFor="name">
          <SearchBarRadio
            id="name"
            type="radio"
            name="searchRadio"
            value="name"
            data-testid="name-search-radio"
          />
          Nome
        </SearchBarLabel>
        <SearchBarLabel htmlFor="firstLetter">
          <SearchBarRadio
            id="firstLetter"
            type="radio"
            name="searchRadio"
            value="firstLetter"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </SearchBarLabel>
      </SearchBarDiv>
      <SearchBarButton
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </SearchBarButton>
    </SearchBarForm>
  );
}

export default SearchBar;
