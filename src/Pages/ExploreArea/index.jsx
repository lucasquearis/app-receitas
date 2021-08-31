import React, { useEffect, useState, useContext } from 'react';

import Header from '../../Components/Header';
import BottomMenu from '../../Components/Footer/BottomMenu';
import fetchApi from '../../Helpers/fetchApi';
import { ContextApp } from '../../Context/ContextApp';
import RecipesContainer from '../../Components/RecipesContainer';

function ExploreArea() {
  const [areas, setAreas] = useState([]);
  const { setRecipes } = useContext(ContextApp);
  const url = 'https://www.themealdb.com/api/json/v1/1/';

  useEffect(() => {
    const getArea = async () => {
      const response = await fetchApi(url, 'list.php?a=list');
      setAreas([
        {
          strArea: 'All',
        },
        ...response.meals,
      ]);
    };
    getArea();
  }, []);

  const handleChange = async ({ target: { value } }) => {
    const maxRecipes = 12;
    const response = await fetchApi(url, 'filter.php?a=', value);
    setRecipes(response.meals.slice(0, maxRecipes));
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
          {areas.map((current, ind) => (
            <option
              key={ ind }
              data-testid={ `${current.strArea}-option` }
            >
              {current.strArea}
            </option>
          ))}
        </select>
        <div>
          <RecipesContainer />
        </div>
      </div>
      <BottomMenu />
    </div>
  );
}

export default ExploreArea;
