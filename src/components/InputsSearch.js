import React, { useContext } from 'react';
import Context from '../context/Context';
import Button from './Button';
import InputRadio from './InputRadio';

function RadiosButtonsSearch() {
  const { filter, setFilter } = useContext(Context);

  const alertFirstLetter = () => {
    const { type, search } = filter;
    if (type === 'first-letter' && search.length === 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      setFilter({ ...filter, search: '' });
    }
  };

  const handeChangeSearch = ({ target: { name, value } }) => {
    setFilter({ ...filter, [name]: value });
    alertFirstLetter();
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        value={ filter.search }
        data-testid="search-input"
        onChange={ (e) => handeChangeSearch(e) }
      />
      <InputRadio
        datatestid="ingredient-search-radio"
        name="Ingrediente"
        value="ingredient"
        id="ingredient"
      />
      <InputRadio
        datatestid="name-search-radio"
        name="Nome"
        value="name"
        id="name"
      />
      <InputRadio
        datatestid="first-letter-search-radio"
        name="Primeira letra"
        value="first-letter"
        id="first-letter"
      />
      <Button
        datatestid="exec-search-btn"
        name="Buscar"
      />
    </div>
  );
}

export default RadiosButtonsSearch;
