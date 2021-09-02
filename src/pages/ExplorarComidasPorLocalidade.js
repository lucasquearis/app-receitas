import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';
import Context from '../context/Context';
import { fetchMealsArea, filterMealsArea } from '../services/requestMealsAPI';
import Loading from '../components/Loading';
import Card from '../components/Card';

export default function ExplorarComidasPorLocalidade() {
  const [selectableAreas, setSelectableAreas] = useState([]);
  const [area, setArea] = useState('Canadian');
  const { meals, setMeals, resetFilter } = useContext(Context);

  const getMealsByArea = async () => {
    const slicedMeals = await fetchMealsArea();
    setSelectableAreas(slicedMeals);
  };

  const getMealsFilteredByArea = async () => {
    const slicedFilteredMeals = await filterMealsArea(area);
    setMeals(slicedFilteredMeals);
  };

  useEffect(() => {
    getMealsByArea();
  }, []);

  useEffect(() => {
    const handleFilter = () => (
      area === 'All' ? resetFilter() : getMealsFilteredByArea()
    );
    handleFilter();
  }, [area, setMeals]);

  if (selectableAreas.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Header>
        Explorar Origem
      </Header>
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target: { value } }) => setArea(value) }
        >
          <option data-testid="All-option" value="All">All</option>
          {(selectableAreas !== []) && selectableAreas.map(({ strArea }, index) => (
            <option key={ index } data-testid={ `${strArea}-option` } value={ strArea }>
              {strArea}
            </option>
          ))}
        </select>
      </div>
      <div>
        { (meals !== []) && meals.map((item, index) => (
          <div key={ item.idMeal }>
            <Link to={ `/comidas/${item.idMeal}` }>
              <Card item={ item } index={ index } />
            </Link>
          </div>
        )) }
      </div>
      <MenuInferior />
    </div>
  );
}
