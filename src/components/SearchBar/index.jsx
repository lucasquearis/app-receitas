import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context/RecipesContext';
import {
  SearchBarWrapper, SearchInput, Label, RadioInput, Button, Span, RadioWrapper,
} from './styles';

function SearchBar({ type }) {
  const { getRecipes } = useContext(RecipesContext);
  const [search, setSearch] = useState('');
  const [option, setOption] = useState('');

  return (
    <SearchBarWrapper>
      <div>
        <Label>
          <SearchInput
            type="text"
            placeholder="Digite sua busca..."
            data-testid="search-input"
            value={ search }
            onChange={ ({ target }) => setSearch(target.value) }
          />
        </Label>
        <RadioWrapper>
          <Label>
            <RadioInput
              name="options"
              data-testid="ingredient-search-radio"
              type="radio"
              value="ingrediente"
              onClick={ ({ target }) => setOption(target.value) }
            />
            <Span>Ingredientes</Span>
          </Label>
          <Label>
            <RadioInput
              name="options"
              data-testid="name-search-radio"
              type="radio"
              value="name"
              onClick={ ({ target }) => setOption(target.value) }
            />
            <Span>Nome</Span>
          </Label>
          <Label>
            <RadioInput
              name="options"
              data-testid="first-letter-search-radio"
              type="radio"
              value="firstLetter"
              onClick={ ({ target }) => setOption(target.value) }
            />
            <Span>Primeira Letra</Span>
          </Label>
          <Button
            onClick={ () => getRecipes(option, search, type.toLowerCase()) }
            data-testid="exec-search-btn"
            type="button"
          >
            Buscar
          </Button>
        </RadioWrapper>
      </div>
    </SearchBarWrapper>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
