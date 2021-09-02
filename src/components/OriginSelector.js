import React, { useEffect, useState, useContext } from 'react';
import fetchArea from '../service/fetchAreas';
import RecipesContext from '../context/RecipesContext';

function OriginSelector() {
  const [areas, setAreas] = useState([]);
  const { setArea } = useContext(RecipesContext);
  useEffect(() => {
    const areasFetch = async () => {
      const meals = await fetchArea();
      setAreas(meals);
    };
    areasFetch();
  }, []);
  return (
    <select
      data-testid="explore-by-area-dropdown"
      onChange={ ({ target: { value } }) => setArea(value) }
      className="w-100 p-2 mb-2 border border-dark bg-light"
    >
      <option data-testid="All-option">All</option>
      {areas
        .map(({ strArea }) => (
          <option key={ strArea } data-testid={ `${strArea}-option` }>
            { strArea }
          </option>))}
    </select>
  );
}

export default OriginSelector;
