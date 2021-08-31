import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import Footer from '../components/Footer';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { getMeal } from '../redux/actions';

function FoodByOrigin() {
  const [origins, setOrigins] = useState([]);
  console.log(origins);

  const dispatch = useDispatch();
  const { reducerAPI: { loading, meals } } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getMeal());
  }, [dispatch]);

  useEffect(() => {
    const fetchOrigins = async () => {
      const END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

      const response = await fetch(END_POINT);
      const { meals: originsList } = await response.json();
      return setOrigins(originsList);
    };
    fetchOrigins();
  }, []);

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
