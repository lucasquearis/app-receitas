import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Form } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMeals } from '../services/fechRecipes';
import '../App.css';

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
    <div className="bodyDiv">
      <Header title="Explorar Origem" />
      <div className="labelExplore">
        <Form.Control
          as="select"
          data-testid="explore-by-area-dropdown"
          custom
          onChange={ handle }
        >
          {
            filterAllIngredients ? filterAllIngredients.slice(0, max)
              .map((item, index) => (
                <option
                  key={ item }
                  data-testid={ `${item}-option` }
                  value={ index + 1 }
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
        </Form.Control>
      </div>
      <div className="bodyCardExplorer">
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
                    className="cardExplore"
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
              className="cardExplore"
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
