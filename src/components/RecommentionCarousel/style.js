import styled from 'styled-components';

export const CarouselWrapper = styled.div`  display: flex;
  overflow-x: scroll;
  width: 100%;
`;

export const RecommendationCard = styled.div` border: 1px solid red;
  margin-left: 15px;

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 16px;
  }

  .recomendation-card-img {
    max-width: 400px;
    width: 43.61vw;
  }
`;
