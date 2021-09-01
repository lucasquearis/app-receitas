import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainContext from '../context/MainContext';

function ExploreByArea() {
  const { areas, setAreas } = useContext(MainContext);

  function handleChange({ target: { value } }) {
    return setArea(value);
  }

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
            area.map((cdarea, index) => (
              <option data-testid={ `${cdarea}-option` } key={ index } value={ cdarea }>
                {cdarea}
              </option>))
          }
        </select>
      </label>
      <Footer />
    </div>
  );
}

export default ExploreByArea;
