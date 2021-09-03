import styled, { createGlobalStyle } from 'styled-components';

import background from './images/backgroundLogin.png';

export const PageBackground = createGlobalStyle`  body {
    background-image: url(${background});
    background-size: cover;
  }
`;

export const Main = styled.main`  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  width: 100vw;
`;

export const Form = styled.form`  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  width: 100vw;

  label {
    width: 83.3%;
  }

  input {
    border: none;
    border-radius: 20px;
    font-size: 24px;
    height: 60px;
    margin-bottom: 20px;
    outline: none;
    padding: 10px;
    position: relative;
    transition: 400ms;
    width: 100%;
  }

  input:focus {
    box-shadow: 1px 3px #7a7a7a;
    top: -2px;
  }
`;

export const Title = styled.h1`  color: #424242;
  font-size: 36px;
  font-weight: 700;
  left: -27.77vw;
  margin-bottom: 20px;
  position: relative;
`;

export const Button = styled.button`  background-color: #00c337;
  border: none;
  border-radius: 15px;
  box-shadow: 0 3px #007c23;
  font-size: 1.2em;
  font-weight: 900;
  height: 50px;
  margin-top: 50px;
  position: relative;
  top: -3px;
  width: 150px;

  :hover {
    box-shadow: none;
    top: 0;
  }

  :disabled {
    background-color: #7a7a7a;
    box-shadow: none;
    top: 0;
  }
`;

export const Logo = styled.img`  margin-bottom: 40px;
  margin-top: 60px;
  width: 333px;
`;
