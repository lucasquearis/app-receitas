import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function DropdownArea() {
  const [areas, setAreas] = useState();
  const list = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const { API } = useContext(RecipesContext);
  const { searchByArea } = API;

  const getAreas = async (param) => {
    await fetch(param)
      .then((response) => response.json())
      .then((resp) => setAreas(resp));
  };

  useEffect(() => {
    getAreas(list);
  }, []); // Component DidMount

  const Onchange = (e) => {
    const { target } = e;
    const { value } = target;
    searchByArea(value);
  };

  if (areas) {
    return (
      <div>
        <select data-testid="explore-by-area-dropdown" onChange={ Onchange }>
          <option data-testid="All-option" key="all">
            All
          </option>
          {areas.meals.map((area) => (
            <option
              key={ area.strArea }
              data-testid={ `${area.strArea}-option` }
            >
              {area.strArea}
            </option>))}
        </select>
      </div>
    );
  }
  return 'Carregando...';
}

export default DropdownArea;
