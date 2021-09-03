import styled from 'styled-components';

export const SearchBarWrapper = styled.div`  background-color: #909090;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0 3px #6c6c6c;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: -20px;
  padding-bottom: 20px;
  padding-top: 20px;

  label {
    color: white;
    display: flex;
  }
`;

export const SearchInput = styled.input`  border: none;
  border-radius: 10px;
  height: 40px;
  margin-bottom: 10px;
  outline: none;
  padding: 10px;
  width: 95%;
`;

export const Button = styled.button`  background-color: #00c337;
  border: none;
  border-radius: 10px;
  box-shadow: 0 3px #007c23;
  height: 40px;
  margin-top: 10px;
  outline: none;
  position: relative;
  width: 95%;

  :hover {
    box-shadow: none;
    top: 3px;
  }

  :focus {
    outline: 0;
  }
`;
