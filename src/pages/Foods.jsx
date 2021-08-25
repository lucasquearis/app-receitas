import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import useFoods from '../hooks/useFoods';

export default function Foods() {
  const foods = useSelector((state) => state.recipes.recipes);
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
  } = useFoods();

  const handleClick = async (e) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <section>
      <Header
        onClickShowInput={ () => setShowSearchBar((prevShow) => !prevShow) }
        pageTitle="Comidas"
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
      {foods.length === 1 ? (
        foods.map(({ idMeal }) => (
          <Redirect key={ idMeal } to={ `${currentPage}/${idMeal}` } />
        ))
      ) : null}
      {
        foods.map((food, index) => (
          <Card
            key={ food.idMeal }
            title={ food.strMeal }
            thumb={ food.strMealThumb }
            index={ index }
          />
        ))
      }
    </section>
  );
}
