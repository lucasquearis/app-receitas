import React from 'react';

function SearchBar() {
  // const [searchEntries, setSearchEntries] = useState({});

  return (
    <div>
      <input type="text" data-testid="search-input" />
      <div>
        <label htmlFor="ingrediente">
          <input name="ingrediente" type="radio" data-testid="ingredient-search-radio" />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input name="nome" type="radio" data-testid="name-search-radio" />
          Nome
        </label>
        <label htmlFor="p-letra">
          <input name="p-letra" type="radio" data-testid="first-letter-search-radio" />
          Primeira letra
        </label>
      </div>
      <div>
        <button type="button" data-testid="exec-search-btn">Buscar</button>
      </div>
    </div>
  );
}

export default SearchBar;
