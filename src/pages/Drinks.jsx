import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import useDrinks from '../hooks/useDrinks';

export default function Drinks() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname;
  const {
    setInputValue,
    setFilterIngredient,
    setFilterName,
    setFilterFirstLetter,
    setSearched,
    inputValue,
  } = useDrinks();
  const drinks = useSelector((state) => state.recipes.recipes);

  const handleClick = async (e) => {
    e.preventDefault();
    setSearched(true);
  };

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
      {drinks.length === 1 ? (
        drinks.map(({ idDrink }) => (
          <Redirect key={ idDrink } to={ `${currentPage}/${idDrink}` } />
        ))
      ) : null}
      {
        drinks.map((drink, index) => (
          <Card
            key={ drink.idDrink }
            title={ drink.strDrink }
            thumb={ drink.strDrinkThumb }
            index={ index }
          />
        ))
      }
    </section>
  );
}
