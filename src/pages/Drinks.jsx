import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestDrinks } from '../redux/actions/recipesActions';
import { sendCocktailData } from '../redux/actions/cocktailsActions';
import {
  getDataByIngredient,
  getDataByName,
  getDataByFirstLetter,
} from '../services/api';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';

export default function Drinks() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filterIngredient, setFilterIngredient] = useState(false);
  const [filterName, setFilterName] = useState(false);
  const [filterFirstLetter, setFilterFirstLetter] = useState(false);

  const drinks = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    dispatch(requestDrinks());
  }, [dispatch]);

  const location = useLocation();
  const currentPage = location.pathname;

  const qtd = 12;

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(sendCocktailData({ data }));
    setSearched(true);
  };

  useEffect(() => {
    if (searched) {
      if (filterIngredient && !filterName && !filterFirstLetter) {
        getDataByIngredient(inputValue)
          .then((response) => setData(response.drinks));
      } else if (filterName && !filterIngredient && !filterFirstLetter) {
        getDataByName(inputValue)
          .then((response) => setData(response.drinks));
      } else if (filterFirstLetter && !filterIngredient && !filterName) {
        getDataByFirstLetter(inputValue)
          .then((response) => setData(response.drinks));
      }
    }
  }, [
    filterIngredient,
    filterName,
    filterFirstLetter,
    currentPage,
    inputValue,
    searched]);

  if (data === null) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return data;
  }

  return (
    <section>
      <Header
        onClickShowInput={ () => setShowSearchBar((prevShow) => !prevShow) }
        pageTitle="Bebidas"
      />
      {showSearchBar ? (
        <SearchBar
          handleChange={ (e) => setInputValue(e) }
          setIngredientValue={ setFilterIngredient }
          setNameValue={ setFilterName }
          setLetterValue={ setFilterFirstLetter }
          handleClick={ handleClick }
          inputValue={ inputValue }
        />
      ) : null}
      {data.length === 1 ? (
        data.map(({ idDrink }) => (
          <Redirect key={ idDrink } to={ `${currentPage}/${idDrink}` } />
        ))
      ) : null}
      {searched ? (
        data
          .slice(0, qtd)
          .map(({ strDrink, idDrink, strDrinkThumb }, index) => (
            <Card
              key={ idDrink }
              thumb={ strDrinkThumb }
              title={ strDrink }
              index={ index }
            />
          ))
      ) : (
        drinks.map((drink, index) => (
          <Card
            key={ drink.idDrink }
            title={ drink.strDrink }
            thumb={ drink.strDrinkThumb }
            index={ index }
          />
        ))
      )}
    </section>
  );
}
