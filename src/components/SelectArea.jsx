import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import useFetchAreaApi from '../customHooks/useFetchAreaApi';
import fetchAPI from '../services/fetchAPI';
import MealCard from './MealCard';
import MealsCard from './MealsCards';

export default function SelectArea() {
  const { dataArea, selectedArea, setSelectedArea, loading } = useContext(Context);
  const [getAreaApi] = useFetchAreaApi();

  const DOZE = 12;

  useEffect(() => { getAreaApi(); }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    const fetchArea = async () => {
      const { meals } = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
      setSelectedArea(meals);
    };
    fetchArea();
  };

  if (loading === true) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      { dataArea ? (
        <label htmlFor="input-area">
          <select
            data-testid="explore-by-area-dropdown"
            onChange={ handleChange }
            id="input-area"
          >
            <option
              value="All"
              key="All"
              data-testid="All-option"
            >
              All
            </option>
            { dataArea.map((area) => (
              <option
                value={ area.strArea }
                key={ area.strArea }
                data-testid={ `${area.strArea}-option` }
              >
                {area.strArea}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <ul>
        { selectedArea ? (
          selectedArea
            .filter((_item, index) => index < DOZE)
            .map((meal, index) => (
              <MealCard
                key={ meal.idMeal }
                meal={ meal }
                index={ index }
              />
            ))
        ) : <MealsCard /> }
      </ul>
    </div>
  );
}
