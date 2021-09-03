import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainContext from '../context/MainContext';
import genericFetchAPI from '../services/genericFetchAPI';

function ExploreByArea() {
  const { areas, setAreas } = useContext(MainContext);
  const [area, setArea] = useState('');

  function handleChange({ target: { value } }) {
    return setArea(value);
  }

  useEffect(() => {
    const resolveArea = async () => {
      const areaList = await genericFetchAPI('meal', 'filter', 'a', area);
      setAreas(areaList);
    };
    resolveArea();
  }, [area, areas, setAreas]);
  return (
    <div>
      <Header title="Explorar Origem" />
      <label htmlFor="explore-by-area-dropdown">
        <select
          name="area"
          id="explore-by-area-dropdown"
          data-testid="explore-by-area-dropdown"
          onChange={ handleChange }
        >
          {/* {
            areas.map((area, index) => (
              <option data-testid={ `${area}-option` } key={ index } value={ area }>
                {area}
              </option>))
          } */}
        </select>
      </label>
      <Footer />
    </div>
  );
}

export default ExploreByArea;
