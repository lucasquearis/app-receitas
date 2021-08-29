import React, { useContext, useEffect, useState } from 'react';
import { fetchApi, MEALS_AREA_LIST } from '../../services';
import AppContext from '../../context/AppContext';

function AreaFilterBar() {
  const [areasList, setAreasList] = useState([]);

  const { selectedArea, setSelectedArea } = useContext(AppContext);

  useEffect(() => {
    const getCountries = async () => {
      const { meals } = await fetchApi(MEALS_AREA_LIST);
      setAreasList(meals);
    };
    getCountries();
  }, []);

  const handleChange = ({ target: { value } }) => {
    setSelectedArea(value);
  };

  return (
    <select
      data-testid="explore-by-area-dropdown"
      value={ selectedArea }
      onChange={ handleChange }
    >
      <option
        data-testid="All-option"
        key="All-option"
        value=""
      >
        All
      </option>
      {areasList.map(({ strArea }) => (
        <option
          data-testid={ `${strArea}-option` }
          key={ `${strArea}-option` }
          value={ strArea }
        >
          { strArea }
        </option>
      ))}
    </select>
  );
}

export default AreaFilterBar;
