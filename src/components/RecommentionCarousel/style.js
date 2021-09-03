import styled from 'styled-components';

export const CarouselWrapper = styled.div`  display: flex;
  overflow-x: auto;
  padding-bottom: 20px;
  padding-top: 20px;
  width: 100vw;
`;

export const RecommendationCard = styled.div`  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-left: 9px;
  margin-right: 9px;
  width: 157px;

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 16px;
  }

  h1, h2 {
    background-color: transparent;
  }

  .recomendation-card-img {
    border-radius: 10px;
    height: 200px;
    max-width: 400px;
    width: 157px;
  }
`;

export const CardTextWrapper = styled.div`  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.42);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: -50px;
  padding: 5px;
`;
