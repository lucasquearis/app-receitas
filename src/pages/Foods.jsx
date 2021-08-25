import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestFoods } from '../redux/actions/recipesActions';
import { sendRecipeData } from '../redux/actions/recipeActions';
import {
  getDataByIngredient,
  getDataByName,
  getDataByFirstLetter,
} from '../services/api';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';

export default function Foods() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    dispatch(requestFoods());
  }, [dispatch]);

  const [searched, setSearched] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filterIngredient, setFilterIngredient] = useState(false);
  const [filterName, setFilterName] = useState(false);
  const [filterFirstLetter, setFilterFirstLetter] = useState(false);

  const location = useLocation();
  const currentPage = location.pathname;

  const qtd = 12;

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(sendRecipeData({ data }));
    setSearched(true);
  };

  useEffect(() => {
    if (searched) {
      if (filterIngredient && !filterName && !filterFirstLetter) {
        getDataByIngredient(inputValue)
          .then((response) => setData(response.meals));
      } else if (filterName && !filterIngredient && !filterFirstLetter) {
        getDataByName(inputValue)
          .then((response) => setData(response.meals));
      } else if (filterFirstLetter && !filterIngredient && !filterName) {
        getDataByFirstLetter(inputValue)
          .then((response) => setData(response.meals));
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
      <Header onClickShowInput={ () => setShowSearchBar(true) } pageTitle="Comidas" />
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
        data.map(({ idMeal }) => (
          <Redirect key={ idMeal } to={ `${currentPage}/${idMeal}` } />
        ))
      ) : null}
      {searched ? (
        data
          .slice(0, qtd)
          .map(({ strMeal, idMeal, strMealThumb }, index) => (
            <Card
              key={ idMeal }
              thumb={ strMealThumb }
              title={ strMeal }
              index={ index }
            />
          ))
      ) : (
        foods.map((food, index) => (
          <Card
            key={ food.idMeal }
            title={ food.strMeal }
            thumb={ food.strMealThumb }
            index={ index }
          />
        ))
      )}
    </section>
  );
}
