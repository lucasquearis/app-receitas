import styled from 'styled-components';

export const ProfileWrapper = styled.main`  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  height: auto;
  justify-content: center;

  a {
    height: 30px;
  }
`;

export const Email = styled.h1`  display: inline-block;
  font-size: 20px;
  font-weight: 900;
  height: 30px;
  margin-top: 10px;
  text-align: center;
  width: 100%;
`;

export const Button = styled.button`  align-items: flex-start;
  background-color: ${({ bgColor = '#afd5ff' }) => bgColor};
  border: none;
  border-radius: 10px;
  box-shadow: 0 3px ${({ shadowColor = '#83a1c1' }) => shadowColor};
  font-weight: 700;
  height: 30px;
  margin-top: 30px;
  position: relative;
  width: ${({ width = '80vw' }) => width};

  :hover {
    box-shadow: none;
    top: 3px;
  }

  a {
    color: #4a4a4a;
    text-decoration: none;
  }
`;
