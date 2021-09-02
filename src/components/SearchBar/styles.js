import styled from 'styled-components';

export const SearchBarForm = styled.form`
  background-color: rgb(128, 15, 15);
  width: 96vw;
  height: 17vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 7px;
  align-items: center;
  position: fixed;
  top: 14vh;
  z-index: 1000;
  animation: slideRight 500ms;
  color: white;
`;

export const SearchBarDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const SearchBarLabel = styled.label`
  font-weight: 500;
`;

export const SearchBarButton = styled.button`
  background-color: rgb(232, 93, 4);
  border-radius: 100px;
  width: 80px;
  margin: auto;
  height: 30px;
  color: white;
  font-weight: 700;
  font-size: 16px;

`;

export const SearchBarRadio = styled.input`
  user-select:none;
  text-align: left;
  animation: fade 0.2s;
  margin: 0 4px;
`;
