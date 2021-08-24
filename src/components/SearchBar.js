// vitals
import React, { useContext, useState } from 'react';
// import { useLocation } from 'react-router-dom'; // QUANDO TIVER A PAGINA DE COMIDAS/BEBIDAS ATIVAR
import myContext from '../context/myContext';
// contants
import { TEXT_ALERT_ONE } from '../services/data';

export default function SearchBar() {
  // const location = useLocation(); // ATIVAR
  const { setSearchValues } = useContext(myContext);
  const [textValue, setTextValue] = useState('');
  const [radioValue, setRadioValue] = useState('ingredient');

  const settings = ({ target: { name, value } }) => {
    if (name === 'filter-radio-button') return setRadioValue(value);
    if (name === 'search-text') return setTextValue(value);
  };
  const submit = () => {
    if (radioValue === 'letter' && textValue.length > 1) return alert(TEXT_ALERT_ONE);
    // const pathName = location.pathname; //ATIVAR
    // const pathName = '/bebidas'; // EXCLUIR
    const pathName = '/comidas'; // EXCLUIR
    setSearchValues({ textValue, radioValue, pathName });
  };

  return (
    <section className="search-container">
      <div className="search-container__input">
        <input
          type="text"
          name="search-text"
          data-testid="search-input"
          onChange={ (e) => settings(e) }
        />
      </div>
      <div className="search-container__radio-button" onChange={ (e) => settings(e) }>
        <label htmlFor="ingredient-search-radio">
          <input
            defaultChecked
            type="radio"
            name="filter-radio-button"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            value="ingredient"
          />
          Ingredientes
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="filter-radio-button"
            data-testid="name-search-radio"
            id="name-search-radio"
            value="name"
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="filter-radio-button"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            value="letter"
          />
          Primeira letra
        </label>
      </div>
      <div className="search-container__button">
        <button
          type="button"
          onClick={ submit }
        >
          Busca
        </button>
      </div>
    </section>
  );
}
