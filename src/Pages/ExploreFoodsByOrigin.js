import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../styles/explore-foods-by-origin.css';

function ExploreFoodsByOrigin() {
  const [foods, setFoods] = useState([1]);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState('All');
  const [id, setId] = useState('');

  useEffect(() => {
    const apiAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const areasResult = async () => {
      const { meals } = await fetch(apiAreas).then((response) => response.json());
      console.log(meals);
      setAreas(meals);
    };
    areasResult();
  }, [setAreas]);

  useEffect(() => {
    setFoods([]);
    if (area === 'All') {
      const foodsResult = async () => {
        const foodApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const { meals } = await fetch(foodApi).then((response) => response.json());
        setFoods(meals);
      };
      foodsResult();
    } if (area !== 'All') {
      const api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
      const foodsResult = async () => {
        const { meals } = await fetch(api).then((response) => response.json());
        setFoods(meals);
      };
      foodsResult();
    }
  }, [area, setFoods]);

  const handleChange = ({ target }) => {
    setArea(target.value);
  };

  const getId = (foodId) => {
    setId(foodId);
  };
  if (id !== '') {
    return <Redirect to={ `/comidas/${id}` } />;
  }
  if (foods.length === 0 || areas.length === 0) {
    return (
      <Spinner className="loading" animation="border" role="status">
        <span className="visually-hidden"> </span>
      </Spinner>
    );
  }
  return (
    <div>
      <Header titlePage="Explorar Origem" btSearch />
      <div className="header-space"> </div>
      <div className="explore-origin">
        <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
          {areas.map((ar) => (
            <option
              key={ ar.strArea }
              value={ ar.strArea }
              data-testid={ `${ar.strArea}-option` }
            >
              {ar.strArea}
            </option>
          ))}
          <option
            value="All"
            data-testid="All-option"
            onChange={ handleChange }
          >
            All
          </option>
        </select>
        <section className="container-cards">
          { foods.map((item, index) => {
            const numCards = 12;
            if (index < numCards) {
              return (
                <button
                  data-testid={ `${index}-recipe-card` }
                  key={ index }
                  type="button"
                  className="horizontal-card"
                  onClick={ () => getId(item.idMeal) }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    className="img-horizontal-card"
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                  />
                  <div className="horizontal-card-infos">
                    <span
                      data-testid={ `${index}-card-name` }
                      className="name-horizontal-card"
                    >
                      { item.strMeal }
                    </span>
                  </div>
                </button>
              );
            }
            return null;
          }) }
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsByOrigin;
