import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { fetchMealsArea } from '../../services';
import RecipesList from './RecipesList';

function ExploreByArea() {
  const [areas, setAreas] = useState();
  const [areaSelected, setAreaSelected] = useState('American');

  useEffect(() => {
    fetchMealsArea().then((response) => {
      setAreas(response.meals);
    });
  }, []);

  const handleChange = ({ target: { value } }) => {
    setAreaSelected(value);
  };

  const headerProps = {
    title: 'Explorar Origem',
    renderSearchBar: true,
  };

  if (!areas) {
    return (
      <h3>Loading</h3>
    );
  }

  return (
    <div>
      <Header { ...headerProps } />

      <form>
        <label htmlFor="area-select">
          Area
          <select
            data-testid="explore-by-area-dropdown"
            id="area-select"
            value={ areaSelected }
            onChange={ handleChange }
          >
            <option
              value="All"
              data-testid="All-option"
            >
              All
            </option>
            {areas.map((area, index) => (
              <option
                key={ index }
                value={ area.strArea }
                data-testid={ `${area.strArea}-option` }
              >
                { area.strArea }
              </option>))}
          </select>
        </label>
      </form>
      <RecipesList areaSelected={ areaSelected } />
      <Footer />
    </div>
  );
}

export default ExploreByArea;
