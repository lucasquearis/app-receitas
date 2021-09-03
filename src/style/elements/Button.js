import styled from 'styled-components';

const Button = styled.button`  align-items: flex-start;
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

export default Button;
