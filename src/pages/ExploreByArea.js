import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainContext from '../context/MainContext';

function ExploreByArea() {
  const { areas, setAreas } = useContext(MainContext);

  const resolveArea = async () => {
    const areaList = await genericFetchAPI('meal', 'filter', 'i', ingredient);
    setAreas(areaList);
  };

  function handleChange({ target: { value } }) {
    return setArea(value);
  }

  useEffect(() => {
    resolveArea();
  }, []);
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
          {
            areas.map((area, index) => (
              <option data-testid={ `${area}-option` } key={ index } value={ area }>
                {area}
              </option>))
          }
        </select>
      </label>
      <Footer />
    </div>
  );
}

export default ExploreByArea;
