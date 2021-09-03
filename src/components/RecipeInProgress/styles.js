import styled from 'styled-components';

export const IngredintSection = styled.section`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

export const IngredientH3 = styled.h3`
  font-size: 20px;
`;

export const IngredintLi = styled.li`
  list-style: none;
  animation: slideLeft 1s;
  margin-top: 5px;
`;

export const Div = styled.div`
  width: 87vw;
  padding: 4vw;
  background-color: white;
  border-radius: 6px;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.4);
`;

export const P = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-weight: 600;
`;

export const Main = styled.main`
    background-color: #EFEFEF;
  background-size: cover;
  background-position: center;
  padding-bottom: 30px;
  width: 100vw;
`;

export const VideoSection = styled.div`
  width: 87vw;
  padding: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;

export const Section = styled.section`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FinishBtn = styled.button`
:disabled {
  background-color: rgba(232, 93, 4, 0.5);
  border-radius: 100px;
  border: 2px solid rgba(255,255,255,0.7);
  z-index: 100000;
  color: white;
  padding: 7px;
  justify-self: center;
  font-weight: 700;
  font-size: 16px;
  bottom: 0;
  left: 0;
  position: fixed;
}
:enabled {
  background-color: rgb(232, 93, 4);
  border-radius: 100px;
  border: 2px solid rgba(255,255,255,0.7);
  z-index: 100000;
  color: white;
  padding: 7px;
  justify-self: center;
  font-weight: 700;
  font-size: 16px;
  bottom: 0;
  left: 0;
  position: fixed;
  animation: popoutDetailBtn 2s;
}
  `;
