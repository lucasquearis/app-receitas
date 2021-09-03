import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import * as ComidasAPI from '../service/ComidasAPI';

export default function ExplorarLocalOrigem() {
  const [area, setArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedFood, setSelectedFood] = useState([]);

  useEffect(() => {
    const getArea = async () => {
      const getAllArea = await ComidasAPI.buscarArea();
      setArea(getAllArea.meals);
    };
    const getFood = async () => {
      const local = await ComidasAPI.buscarTodasComidasPorLetra('c');
      const foodNumber = 12;
      const filterFood = local.filter((_food, index) => index < foodNumber);
      setSelectedFood(filterFood);
    };
    getFood();
    getArea();
  }, []);

  const handleOnChange = ({ target: { value } }) => {
    setSelectedArea(value);
  };

  useEffect(() => {
    const selectedLocal = async () => {
      let local;
      if (selectedArea !== 'All') {
        local = await ComidasAPI.buscarComidasArea(selectedArea);
        const foodNumber = 12;
        const filterFood = local.meals.filter((_food, index) => index < foodNumber);
        setSelectedFood(filterFood);
        return;
      }
      local = await ComidasAPI.buscarTodasComidasPorLetra('C');
      const foodNumber = 12;
      const filterFood = local.filter((_food, index) => index < foodNumber);
      setSelectedFood(filterFood);
    };
    selectedLocal();
  }, [selectedArea]);

  const getCard = (food, index) => (
    <section className="card" key={ index } data-testid={ `${index}-recipe-card` }>
      <Link to={ `/comidas/${food.idMeal}` }>
        <img src={ food.strMealThumb } data-testid={ `${index}-card-img` } alt="img" />
        <h4 data-testid={ `${index}-card-name` }>{ food.strMeal }</h4>
      </Link>
    </section>
  );

  return (
    <main className="main-section">
      <section className="header-section">
        <Header title="ExplorarLocalOrigem" searchIcon />
      </section>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleOnChange }
      >
        <option data-testid="All-option">All</option>
        { area.map((local, index) => (
          <option
            data-testid={ `${local.strArea}-option` }
            key={ index }
          >
            {local.strArea}
          </option>
        ))}
      </select>
      { selectedFood.map((food, index) => getCard(food, index))}
      <Footer />
    </main>
  );
}
