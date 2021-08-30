import React, { useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import useRecipes from '../hooks/useRecipes';
import useArea from '../hooks/useArea';
import Origins from '../components/Origins';

export default function ExploreOrigin() {
  const foods = useSelector((state) => state.recipes.recipes);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname;
  const history = useHistory();
  const [redirectToDetails, setRedirectToDetails] = useState(false);
  const areas = [
    { strArea: 'All' },
    ...useSelector((state) => state.recipes.areas),
  ];

  const {
    setInputValue,
    setFilterIngredient,
    setFilterName,
    setFilterFirstLetter,
    setSearched,
    inputValue,
  } = useRecipes(setRedirectToDetails);

  const { setArea, area } = useArea(setRedirectToDetails);

  const handleClickSearch = async (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const handleChangeArea = (selectedArea) => {
    setArea(selectedArea);
  };

  const handleClickCard = (id) => {
    history.push(`/comidas/${id}`);
  };

  return (
    <section>
      <Header
        onClickShowInput={ () => setShowSearchBar((prevShow) => !prevShow) }
        pageTitle="Explorar Origem"
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
      <Origins
        value={ area }
        origins={ areas }
        onChange={ handleChangeArea }
      />
      {redirectToDetails ? (
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
            onClick={ () => handleClickCard(food.idMeal) }
            type="recipe"
            index={ index }
          />
        ))
      }
    </section>
  );
}
