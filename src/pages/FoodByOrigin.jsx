import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import Footer from '../components/Footer';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { getMeal } from '../redux/actions';

function FoodByOrigin() {
  const dispatch = useDispatch();
  const { reducerAPI: { loading, meals } } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getMeal());
  }, [dispatch]);

  if (loading) {
    return <h2>Carregando...</h2>;
  }
  return (
    <>
      <HeaderWithSearch>Explorar Origem</HeaderWithSearch>
      <ul>
        {
          meals.map(({ strMealThumb, strMeal }) => (
            <li key={ v4() }>
              <img alt={ strMeal } src={ strMealThumb } />
              <p>{ strMeal }</p>
            </li>
          ))
        }
      </ul>
      <Footer />
    </>
  );
}

export default FoodByOrigin;
