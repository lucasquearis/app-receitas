import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodAreaThunk } from '../Redux/actions/FoodExplore';

function FoodPlaceExplore() {
  const dispatch = useDispatch();
  const { Areas, isLoading } = useSelector((state) => state.areas);

  useEffect(() => {
    dispatch(getFoodAreaThunk());
  }, [dispatch]);

  if (!isLoading) {
    return (
      <select
        data-testid="explore-by-area-dropdown"
      >
        {
          Areas
            .map(({ strArea }, index) => (
              <option
                key={ index }
                data-testid={ `${strArea}-category-filter` }
              >
                { strArea }
              </option>
            ))
        }
      </select>
    );
  }
  return ('Carregando');
}

export default FoodPlaceExplore;
