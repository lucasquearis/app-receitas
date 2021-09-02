import styled from 'styled-components';

export const HeaderWrapper = styled.header`  align-items: center;
  background-color: transparent;
  box-sizing: border-box;
  display: flex;
  font-size: 24px;
  font-weight: 900;
  height: 80px;
  justify-content: space-around;
  text-align: center;
  width: 100vw;

  h1 {
    display: inline-block;
    position: relative;
  }

  input {
    display: inline-block;
    height: 30px;
    position: absolute;
    top: 20px;
  }

  input:first-child {
    left: 10px;
  }

  input:nth-child( 3 ) {
    right: 10px;
  }
`;

export default null;
