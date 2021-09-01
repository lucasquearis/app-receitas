import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {
  foodPerAreaAllFetch,
  foodPerAreaFilterFetch,
  foodPerAreaListFetch,
} from '../redux/actions/actionFood';

function ExplorePerArea() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(foodPerAreaListFetch());
    dispatch(foodPerAreaAllFetch());
  }, [dispatch]);

  const handleChange = ({ target: { value: area } }) => {
    if (area === 'All') {
      dispatch(foodPerAreaAllFetch());
    } else {
      dispatch(foodPerAreaFilterFetch(area));
    }
  };

  const foodPerAreaList = useSelector(({ foodReducer }) => foodReducer.foodPerAreaList);
  const foodPerAreaFilter = useSelector(({ foodReducer }) => (
    foodReducer.foodPerAreaFilter));

  return (
    <>
      <Header title="Explorar Origem" />
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        <option data-testid="All-option" value="All">All</option>
        { foodPerAreaList.map((area) => (
          <option
            key={ area.strArea }
            data-testid={ `${area.strArea}-option` }
            value={ area.strArea }
          >
            { area.strArea }
          </option>)) }
      </select>
      {foodPerAreaFilter.map((item, index) => (
        <Link to={ `/comidas/${item.idMeal}` } key={ item.idMeal }>
          <FoodCard food={ item } index={ index } />
        </Link>))}
      <Footer />
    </>
  );
}

export default ExplorePerArea;
