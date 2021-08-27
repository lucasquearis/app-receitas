import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDataContext } from '../../../../context/DataProvider';
import { useDetailsContext } from '../../../../context/DetailsProvider';

export default function RecipesRecommendation() {
  const { data, loading } = useDataContext();
  const { type, recommendations, setRecommendations } = useDetailsContext();

  useEffect(() => {
    const getRecommendations = async () => {
      const maxLength = 6;
      const recommendedType = type === 'food' ? 'drinks' : 'food';
      const result = data[recommendedType].slice(0, maxLength);
      setRecommendations(result);
    };
    getRecommendations();
  }, [data, setRecommendations, type]);

  return (
    <Carousel variant="dark" className="w-50">
      {!loading && recommendations.map((cardRecommendation, index) => (
        <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
          <img
            className="d-block w-100"
            src={ cardRecommendation.strDrinkThumb || cardRecommendation.strMealThumb }
            alt="First slide"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
