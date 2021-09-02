import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMeals } from '../services/fechRecipes';

export default function ExploreOrigin() {
  const [filterAllIngredients, setfilterAllIngredients] = useState([]);
  const [inputSelect, setInputSelect] = useState('');
  const [idLink, setIdLink] = useState('');
  const [meals, setMeals] = useState([]);

  const max = 12;

  const filters = (data) => {
    setMeals(data);
    const allIngredients = [];
    data.map((i) => allIngredients.push(...Object.entries(i)
      .filter((item) => item[0].includes('strArea'))
      .map((item) => item[1])
      .filter((item) => item !== '' && item !== null && item !== ' ')));
    const filterAll = allIngredients
      .filter((item, index) => allIngredients.indexOf(item) === index);
    setfilterAllIngredients(filterAll);
  };

  useEffect(() => {
    fetchMeals(filters);
  }, []);

  const handle = ({ target: { value } }) => {
    setInputSelect(value);
  };

  const goLink = ({ target: { id } }) => {
    setIdLink(id);
  };

  const resetFilter = () => {
    setInputSelect('');
  };

  if (idLink) {
    return (<Redirect to={ `/comidas/${idLink}` } />);
  }
  return (
    <div>
      <Header title="Explorar Origem" />
      <div>
        <label htmlFor="area">
          <select
            data-testid="explore-by-area-dropdown"
            name="area"
            id="area"
            onChange={ handle }
          >
            {
              filterAllIngredients ? filterAllIngredients.slice(0, max).map((item) => (
                <option
                  key={ item }
                  data-testid={ `${item}-option` }
                  value={ item }
                >
                  {item}
                </option>
              )) : (null)
            }
            <option
              value=""
              data-testid="All-option"
              onClick={ resetFilter }
            >
              ALL
            </option>
          </select>
        </label>
      </div>
      <div>
        {
          inputSelect ? (
            meals.filter((item) => item.strArea === inputSelect)
              .map((item, index) => (
                (
                  <div
                    data-testid={ `${index}-recipe-card` }
                    key={ item.idMeal }
                    onClickCapture={ goLink }
                    id={ item.idMeal }
                  >
                    <div>
                      <img
                        src={ item.strMealThumb }
                        data-testid={ `${index}-card-img` }
                        alt="imagem"
                        width="100%"
                        id={ item.idMeal }
                      />
                      <p
                        data-testid={ `${index}-card-name` }
                        id={ item.idMeal }
                      >
                        {item.strMeal}
                      </p>
                    </div>
                  </div>)
              ))
          ) : (meals.slice(0, max).map((item, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ item.idMeal }
              onClickCapture={ goLink }
              id={ item.idMeal }
            >
              <div>
                <img
                  src={ item.strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt="imagem"
                  width="100%"
                  id={ item.idMeal }
                />
                <p
                  data-testid={ `${index}-card-name` }
                  id={ item.idMeal }
                >
                  {item.strMeal}
                </p>
              </div>
            </div>))
          )
        }
      </div>
      <Footer />
    </div>
  );
}
