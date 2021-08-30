import React, { useEffect, useState } from 'react';

import Header from '../../Components/Header';
import BottomMenu from '../../Components/Footer/BottomMenu';
import fetchApi from '../../Helpers/fetchApi';

function ExploreArea() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const getArea = async () => {
      const response = await fetchApi('https://www.themealdb.com/api/json/v1/1/', 'list.php?a=list');
      setAreas(response.meals);
    };
    getArea();
  }, []);

  const handleChange = ({ target: { value } }) => {
    console.log(value);
  };

  return (
    <div>
      <Header
        title="Explorar Ingredientes"
        searchButton={ false }
      />
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (event) => handleChange(event) }
        >
          {areas.map((current) => <option key={ current }>{current.strArea}</option>)}
        </select>
        <div>
          oi
        </div>
      </div>
      <BottomMenu />
    </div>
  );
}

export default ExploreArea;
