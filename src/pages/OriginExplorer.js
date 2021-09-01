import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import { getMealsAreaList, getMealsArea } from '../services/mealAPI';

const NUMBER_CARDS = 11;

function OriginExplorer() {
  const [areaFood, setAreaFood] = useState();
  const [valueOpt, setValueOpt] = useState('American');
  const [area, setArea] = useState(false);

  useEffect(() => {
    const getByAreaDropdown = async () => {
      const { meals } = await getMealsAreaList();
      setAreaFood(meals);
    };
    getByAreaDropdown();
  }, []);

  useEffect(() => {
    if (valueOpt) {
      const getByAreList = async () => {
        const { meals } = await getMealsArea(valueOpt);
        setArea(meals);
      };
      getByAreList();
    }
  }, [valueOpt]);

  const cards = area ? area.filter((i, k) => k <= NUMBER_CARDS) : false;
  if (!areaFood) return <p>Loading...</p>;
  console.log(areaFood);
  return (
    <div>
      <Header />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => setValueOpt(e.target.value) }
      >
        <option value="All" data-testid="All-option">All</option>
        {areaFood.map((i, k) => (
          <option
            key={ k }
            value={ i.strArea }
            data-testid={ `${i.strArea}-option` }
          >
            { i.strArea }
          </option>))}
      </select>
      <div>
        {cards && cards.map((meal, index) => (
          <Link key={ index } to={ `/comidas/${meal.idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.str }
                data-testid={ `${index}-card-img` }
                style={ { width: '100px' } }
              />
              <div>
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <FooterMenu />
    </div>
  );
}

export default OriginExplorer;

// idMeal: "52855"
// strMeal: "Banana Pancakes"
// strMealThumb: "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg"
