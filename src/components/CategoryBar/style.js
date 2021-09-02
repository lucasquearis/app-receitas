import styled from 'styled-components';

export const ButtonsWrapper = styled.div`  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  width: 99vw;

  button:first-child {
    flex-grow: 5;
    margin-bottom: 5px;
    margin-right: 0;
    width: 100vw;
  }

  button:nth-child( 6 ) {
    margin-right: 0;
  }
`;

export const Button = styled.button`  background-color: gray;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 900;
  padding: 5px;
`;
