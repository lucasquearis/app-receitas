import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 } from 'uuid';
import Footer from '../components/Footer';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { getMeal } from '../redux/actions';
import Select from '../components/DefaultComponents/Select';
import useRedirect from '../hooks/useRedirect';

function FoodByOrigin() {
  const [origins, setOrigins] = useState(['All']);
  const [firstTwelve, setFistTwelve] = useState([]);
  const [originSelect, setOriginSelect] = useState({ selected: 'All' });
  const { shouldRedirect, redirect } = useRedirect();

  const TWELVE = 12;

  const { selected } = originSelect;

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
      const results = originsList.map(({ strArea }) => strArea);
      return setOrigins([...origins, ...results]);
    };
    fetchOrigins();
  }, [origins]);

  useEffect(() => {
    if (selected === 'All') {
      const result = meals.slice(0, TWELVE);
      setFistTwelve(result);
    } else {
      const result = meals
        .filter(({ strArea }) => strArea === selected).slice(0, TWELVE);
      setFistTwelve(result);
    }
  }, [meals, selected]);

  const handleChange = ({ target: { name, type, value, checked } }) => {
    function newValue() {
      switch (type) {
      case 'checkbox': return checked;
      case 'number': return +value;
      default: return value;
      }
    }
    setOriginSelect({ ...originSelect, [name]: newValue() });
  };

  if (loading) {
    return <h2>Carregando...</h2>;
  }
  if (redirect.should) {
    return <Redirect to={ redirect.path } />;
  }
  return (
    <>
      <HeaderWithSearch>Explorar Origem</HeaderWithSearch>
      <Select
        handleChange={ handleChange }
        label="Origin"
        name="selected"
        options={ origins }
        testIdSelect="explore-by-area-dropdown"
        value={ selected }
      />
      <>
        {
          firstTwelve.map((item, index) => (
            <button
              type="button"
              onClick={ () => shouldRedirect(`/comidas/${item.idMeal}`) }
              key={ v4() }
              data-testid={ `${index}-recipe-card` }
              className="recipe-card"
            >
              <img
                alt="meal"
                src={ item.strMealThumb }
                data-testid={ `${index}-card-img` }
              />
              <h4 data-testid={ `${index}-card-name` }>{item.strMeal}</h4>
            </button>
          ))
        }
      </>
      <Footer />
    </>
  );
}

export default FoodByOrigin;
