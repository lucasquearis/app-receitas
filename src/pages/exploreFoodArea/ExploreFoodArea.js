import React, { useEffect, useState } from 'react';
import CardsList from '../../components/CardsList/CardsList';
import Header from '../../components/header/Header';

const ExploreFoodArea = () => {
  const [areas, setAreas] = useState();
  const [currentArea, setCurrentArea] = useState();
  const [filteredFoods, setFilteredFoods] = useState({
    bool: false,
    foods: [],
  });

  useEffect(() => {
    const getAreas = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const response = await fetch(url);
      const { meals } = await response.json();
      setAreas(meals);
    };
    getAreas();
    setCurrentArea('American');
  }, []);

  useEffect(() => {
    if (currentArea !== undefined) {
      const getFoodsByArea = async () => {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${currentArea}`;
        const response = await fetch(url);
        const { meals } = await response.json();

        let mealsArray;
        const maxCards = 12;
        if (meals.length > maxCards) {
          mealsArray = meals.slice(0, maxCards);
        } else {
          mealsArray = meals;
        }
        setFilteredFoods({
          bool: true,
          foods: mealsArray,
        });
      };
      getFoodsByArea();
    }
  }, [currentArea]);

  const handleChange = ({ target: { value } }) => {
    setCurrentArea(value);
  };

  if (areas !== undefined) {
    return (
      <div>
        <Header>Explorar Origem</Header>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ handleChange }
        >
          { areas.map(({ strArea }) => (
            <option
              key={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          )) }
          <option data-testid="All-option">All</option>
        </select>
        { filteredFoods.bool && (<CardsList array={ filteredFoods.foods } />) }
      </div>
    );
  }
  return null;
};

export default ExploreFoodArea;
