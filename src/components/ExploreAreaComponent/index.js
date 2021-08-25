import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { getAreas, getFood, getFoodByArea } from '../../services/foodAPI';
import Loading from '../Loading';
import MealCard from '../MealCard';

const NUMBER_ELEVEN = 11;

const ExploreAreaComponent = () => {
  const [selectedArea, setSelectedArea] = useState('All');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const getAreasFromApi = async () => {
      const response = await getAreas();
      setAreas(response);
      setLoadingAreas(false);
    };
    getAreasFromApi();
  }, []);

  useEffect(() => {
    const selectMeals = async () => {
      setLoading(true);
      if (selectedArea === 'All') {
        const response = await getFood('', 'Nome');
        setMeals(response);
        setLoading(false);
      } else {
        const response = await getFoodByArea(selectedArea);
        setMeals(response);
        setLoading(false);
      }
    };
    selectMeals();
  }, [selectedArea]);

  if (loadingAreas) return <Loading />;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="m-4 col-md">
        <Form.Control
          as="select"
          custom
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target: { value } }) => setSelectedArea(value) }
        >
          <option value="All" data-testid="All-option">All</option>
          {
            areas.map(({ strArea }) => (
              <option
                key={ `${strArea}-select-option` }
                data-testid={ `${strArea}-option` }
              >
                { strArea }
              </option>
            ))
          }
        </Form.Control>
      </div>
      <div className="d-flex flex-row flex-wrap">
        {
          loading
            ? <Loading />
            : meals.filter((e, index) => index <= NUMBER_ELEVEN)
              .map((meal, index) => (
                <MealCard
                  key={ `${index}-card-name` }
                  meal={ meal }
                  index={ index }
                />
              ))
        }
      </div>
    </div>
  );
};

export default ExploreAreaComponent;
