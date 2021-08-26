import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getMeal } from '../redux/actions';
import HeaderWithSearch from '../components/HeaderWithSearch';
import Footer from '../components/Footer';
import useCategories from '../hooks/useCategories';
import { setLoading } from '../redux/actions/loading';

function MealsList() {
  const { reducerAPI: { loading, meals } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [renderedMeals, setRenderedMeals] = useState([]);

  useEffect(() => {
    dispatch(getMeal());
  }, [dispatch]);

  useEffect(() => {
    if (meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (meals !== null && meals.length > 1) {
      const TWELVE = 12;
      const newMeals = [...meals.slice(0, TWELVE)];
      setRenderedMeals(newMeals);
    }
  }, [meals]);

  const [catList, setCatList] = useState([]);
  const CATURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const categories = useCategories(CATURL, 'meals');
  useEffect(() => {
    setCatList(categories);
  }, [categories]);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (meals !== null && meals.length === 1) {
    return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
  }

  const handleClick = async (name) => {
    dispatch(setLoading(true));
    const TWELVE = 12;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
    const results = await fetch(url).then((response) => response.json());
    const firstTwelve = await results.meals.slice(0, TWELVE);
    setRenderedMeals(firstTwelve);
    dispatch(setLoading(false));
  };

  const handleClickAll = () => {
    const TWELVE = 12;
    const newMeals = [...meals.slice(0, TWELVE)];
    setRenderedMeals(newMeals);
  };

  return (
    <div>
      <div>
        <HeaderWithSearch>
          Comidas
        </HeaderWithSearch>
        { catList.map((category, index) => (
          <button
            type="button"
            key={ index }
            onClick={ () => handleClick(category.strCategory) }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))}
        <button
          type="button"
          onClick={ handleClickAll }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
      { renderedMeals.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            alt="meal"
            src={ item.strMealThumb }
            data-testid={ `${index}-card-img` }
          />
          <h4 data-testid={ `${index}-card-name` }>{item.strMeal}</h4>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default MealsList;
