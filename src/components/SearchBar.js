import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';

const SearchBar = ({ className }) => (
  <div className={ className }>
    <Input
      textInput="text"
      datatestId="search-input"
      name="searchText"
      placeH="Digite um texto"
      onChange={ () => {} }
    />
    <div className="radio-container">
      <Input
        textInput="radio"
        datatestId="ingredient-search-radio"
        name="search"
        onChange={ () => {} }
        id="ingredient"
        textLabel="Ingrediente"
      />
      <Input
        textInput="radio"
        datatestId="name-search-radio"
        name="search"
        onChange={ () => {} }
        id="name"
        textLabel="Nome"
      />
      <Input
        textInput="radio"
        datatestId="first-letter-search-radio"
        name="search"
        onChange={ () => {} }
        placeH="sadsa"
        id="letter"
        textLabel="Primeira letra"
      />
    </div>
    <Button
      onClick={ () => {} }
      datatestId="exec-search-btn"
      disabled
      btnText="Pesquisar"
    />
  </div>
);

SearchBar.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SearchBar;
