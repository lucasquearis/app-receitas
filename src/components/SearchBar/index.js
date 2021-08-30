import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Context from '../../context';

const radioSearchOptions = [
  ['ingredient', 'Ingrediente', 'i'],
  ['name', 'Nome', 's'],
  ['first-letter', 'Primeira letra', 'f'],
];

function SearchBar() {
  const {
    inputText,
    setInputText,
    radioValue,
    setRadioValue,
    setIsFetching,
    requestApiData,
    setToggle,
    apiData,
  } = useContext(Context);

  const [textValue, setTextValue] = React.useState('');
  const [searchType, setSearchType] = React.useState('s');

  function handleClick(e) {
    e.preventDefault();
    setIsFetching(true);
    setInputText(textValue);
    setRadioValue(searchType);
    setToggle(false);
  }

  const { pathname } = useLocation();
  const endpoint = pathname.includes('comida') ? 'themeadldb' : 'thecocktaildb';
  const query = pathname === '/comidas' ? 'meal' : 'drink';
  const page = query === 'meal' ? 'comidas' : 'bebidas';

  React.useEffect(() => {
    if (inputText) {
      if (radioValue === 'f' && inputText.length !== 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        requestApiData(endpoint);
      }
    }
  }, [inputText, radioValue, endpoint, requestApiData]);

  return (
    <div>
      {apiData[0][`${query}s`] && apiData[0][`${query}s`].length === 1
    && <Redirect
      to={ `/${page}/${apiData[0][`${query}s`][0][`id${query
        .charAt(0).toUpperCase() + query.slice(1)}`]}` }
    />}
      <div>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
          onChange={ (e) => setTextValue(e.target.value) }
          value={ textValue }
        />
      </div>
      <div>
        { radioSearchOptions.map((option) => (
          <label
            key={ option[0] }
            htmlFor={ option[0] }
          >
            <input
              checked={ radioValue === option[2] }
              data-testid={ `${option[0]}-search-radio` }
              id={ option[0] }
              name="search-radio"
              type="radio"
              onChange={ (e) => setSearchType(e.target.value) }
              value={ option[2] }
            />
            { option[1] }
          </label>
        ))}
      </div>
      <div>
        <button
          data-testid="exec-search-btn"
          onClick={ handleClick }
          type="submit"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
