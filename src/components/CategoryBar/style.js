import styled from 'styled-components';

export const ButtonsWrapper = styled.div`  background-color: #ccc;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0 3px #bbb;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100px 100px 100px;
  height: 150px;
  justify-content: space-around;
  margin-left: auto;
  margin-right: auto;
  margin-top: -30px;
  overflow: hidden;
  padding: 30px 5px 20px;
  width: 100vw;
`;

export const Button = styled.button`  background-color: #da9630;
  border: none;
  border-radius: 15px;
  box-shadow: 0 3px #bf852d;
  font-size: 16px;
  font-weight: 900;
  position: relative;
  width: auto;
  word-wrap: break-word;

  :hover {
    box-shadow: none;
    top: 3px;
  }

  :focus {
    outline: none;
  }
`;
