import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import Categories from '../components/Categories';
import useRecipes from '../hooks/useRecipes';
import useCategories from '../hooks/useCategories';

export default function Drinks() {
  const drinks = useSelector((state) => state.recipes.recipes);
  const categories = [
    { strCategory: 'All' },
    ...useSelector((state) => state.recipes.categories),
  ];
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname;
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  const {
    setInputValue,
    setFilterIngredient,
    setFilterName,
    setFilterFirstLetter,
    setSearched,
    inputValue,
  } = useRecipes(setRedirectToDetails);

  const { filterCategory, setFilterCategory } = useCategories(setRedirectToDetails);

  const handleClickSearch = async (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const handleClickFilter = (category) => {
    if (category !== filterCategory) {
      setFilterCategory(category);
    } else {
      setFilterCategory('All');
    }
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
          handleClick={ handleClickSearch }
          inputValue={ inputValue }
        />
      ) : null}
      <Categories
        categories={ categories }
        onClick={ handleClickFilter }
      />
      {redirectToDetails ? (
        drinks.map(({ idDrink }) => (
          <Redirect key={ idDrink } to={ `${currentPage}/${idDrink}` } />
        ))
      ) : null}
      {
        drinks.map((drink, index) => (
          <Card
            key={ drink.idDrink }
            id={ drink.idDrink }
            title={ drink.strDrink }
            thumb={ drink.strDrinkThumb }
            index={ index }
          />
        ))
      }
    </section>
  );
}
