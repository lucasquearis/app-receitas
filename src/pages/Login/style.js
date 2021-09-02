import styled from 'styled-components';

export const Main = styled.main`  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

export const Form = styled.form`  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  width: 100vw;

  label {
    width: 70%;
  }

  input {
    border-radius: 5px;
    height: 40px;
    margin-bottom: 30px;
    width: 100%;
  }
`;

export const Title = styled.h1`  font-size: 36px;
  font-weight: 900;
  position: absolute;
  top: 100px;
`;

export const Button = styled.button`  background-color: red;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  font-weight: 900;
  height: 40px;
  width: 100px;

  :disabled {
    background-color: gray;
  }

`;
