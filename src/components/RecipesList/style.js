import styled from 'styled-components';

export const CardsListWrapper = styled.main`  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 100px;
`;

export const CardWrapper = styled.div`  border-radius: 15px;
  box-shadow: 0 0 0.3em gray;
  font-size: 18px;
  margin-top: 10px;
  overflow: hidden;
  text-align: center;
  width: 46%;

  img {
    width: 100%;
  }
`;
