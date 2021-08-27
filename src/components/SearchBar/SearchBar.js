import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionSaveItems } from '../../actions/index';
import { searchOnClick } from './utils';

const SearchBar = ({ bool, saveItems }) => {
  const [search, setSearch] = useState({
    textValue: '',
    radioValue: '',
  });

  const [items, setItems] = useState();

  const [redirect, setRedirect] = useState({
    bool: false,
  });

  useEffect(() => {
    const checkItems = () => {
      if (items !== undefined && Object.values(items)[0].length === 1) {
        let pathName;
        if (Object.keys(items)[0] === 'meals') {
          pathName = 'comidas';
        } else {
          pathName = 'bebidas';
        }
        const mealDrink = Object.values(items)[0];
        const mealDrinkDetails = Object.values(mealDrink)[0];
        const mealDrinkIdKey = Object.keys(mealDrinkDetails)[0];
        const mealDrinkId = mealDrinkDetails[mealDrinkIdKey];
        setRedirect({
          bool: true,
          pathName,
          id: mealDrinkId,
        });
      }
    };
    checkItems();
    const saveItemsStore = () => {
      if (items !== undefined) {
        saveItems(Object.values(items)[0]);
      }
    };
    saveItemsStore();
  }, [items, saveItems]);

  const handleChange = ({ target: { name, value } }) => {
    setSearch({
      ...search,
      [name]: value,
    });
  };

  if (redirect.bool) {
    return <Redirect to={ `/${redirect.pathName}/${redirect.id}` } />;
  }

  if (bool) {
    return (
      <div>
        <input
          type="text"
          name="textValue"
          data-testid="search-input"
          placeholder="Busque por uma receita"
          onChange={ handleChange }
        />
        <div name="radioValue" onChange={ handleChange }>
          <label htmlFor="ingredients">
            Ingredientes
            <input
              type="radio"
              id="ingredients"
              name="radioValue"
              value="Ingredientes"
              data-testid="ingredient-search-radio"
            />
          </label>
          <label htmlFor="name">
            Nome
            <input
              type="radio"
              id="name"
              name="radioValue"
              value="Nome"
              data-testid="name-search-radio"
            />
          </label>
          <label htmlFor="first-letter">
            Primeira letra
            <input
              type="radio"
              id="first-letter"
              name="radioValue"
              value="Primeira letra"
              data-testid="first-letter-search-radio"
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => searchOnClick(search, setItems) }
        >
          Buscar
        </button>
      </div>
    );
  }
  return null;
};

function mapDispatchToProps(dispatch) {
  return {
    saveItems: (items) => dispatch(actionSaveItems(items)),
  };
}

SearchBar.propTypes = {
  bool: PropTypes.bool.isRequired,
  saveItems: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchBar);