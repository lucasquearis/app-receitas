import styled from 'styled-components';

export const CardsListWrapper = styled.main`  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 100px;
`;

export const CardWrapper = styled.div`  border-radius: 15px;
  box-shadow: 0 3px rgba(0, 0, 0, 0.31);
  display: flex;
  font-size: 20px;
  height: 180px;
  margin-top: 10px;
  overflow: hidden;
  text-align: center;
  width: 46%;

  h4 {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.42);
    color: #4a4a4a;
    font-weight: 900;
    height: 50px;
    margin-top: -20px;
    padding-top: 10px;
  }

  img {
    height: 190px;
    margin-bottom: -45px;
    width: 100%;
  }
`;
