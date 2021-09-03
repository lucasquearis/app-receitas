import styled from 'styled-components';

export const HeaderWrapper = styled.header`  align-items: center;
  background-color: #ffff69;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0 3px #98983f;
  box-sizing: border-box;
  display: flex;
  font-size: 24px;
  font-weight: 900;
  height: 60px;
  justify-content: space-around;
  margin-bottom: 10px;
  position: fixed;
  text-align: center;
  width: 100vw;
  z-index: 10;

  h1 {
    color: #4a4a4a;
    display: inline-block;
    position: relative;
  }

  input {
    display: inline-block;
    height: 30px;
    position: absolute;
    top: 15px;
  }

  input:first-child {
    left: 10px;
  }

  input:nth-child( 3 ) {
    right: 10px;
  }
`;

export const HeaderSpace = styled.div`  height: 70px;
`;
