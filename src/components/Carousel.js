import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

function Carousel({ recommendation }) {
  const { pathname } = useLocation();
  const [itemShow, setItemShow] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(1);
  const [pathToGo, setPathToGo] = useState('');

  useEffect(() => {
    const TOTAL_RECOMMENDATIONS = 6;
    setItemShow(recommendation.slice(0, TOTAL_RECOMMENDATIONS));
  }, [recommendation]);

  useEffect(() => {
    if (pathname.includes('/comidas')) {
      setPathToGo('/bebidas');
    } else {
      setPathToGo('/comidas');
    }
  }, [pathname]);

  const handlePrevious = () => {
    const FOUR = 4;
    const FIVE = 5;
    if (initialIndex === 0) {
      setInitialIndex(FOUR);
      setLastIndex(FIVE);
    } else {
      setInitialIndex(initialIndex - 2);
      setLastIndex(lastIndex - 2);
    }
  };

  const handleNext = () => {
    const FOUR = 4;
    if (initialIndex === FOUR) {
      setInitialIndex(0);
      setLastIndex(1);
    } else {
      setInitialIndex(initialIndex + 2);
      setLastIndex(lastIndex + 2);
    }
  };

  return (
    <div>
      { itemShow.map((item, i) => {
        if (i === initialIndex || i === lastIndex) {
          return (
            <div key={ i } data-testid={ `${i}-recomendation-card` }>
              <RecipeCard
                recipe={ item }
                index={ i }
                type={ pathToGo }
                dataId="-recomendation-title"
              />
            </div>
          );
        }
        return (
          <div key={ i } data-testid={ `${i}-recomendation-card` } hidden>
            <RecipeCard
              recipe={ item }
              index={ i }
              type={ pathToGo }
              dataId="-recomendation-title"
            />
          </div>
        );
      }) }
      <button type="button" onClick={ handlePrevious }>Previous</button>
      <button type="button" onClick={ handleNext }>Next</button>
    </div>
  );
}

Carousel.propTypes = {
  recommendation: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Carousel;
