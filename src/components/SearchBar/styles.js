import styled, { keyframes } from 'styled-components';

const searchFrames = keyframes`
  from {
    opacity: 0;
    transform: translateX(70%)
  }

  to {
    opacity: : 1;
    transform: translateX(0%)
  }
`;

export const Label = styled.label`
  display: flex;
  gap: 2px;
`;

export const SearchBarWrapper = styled.section`
  position: fixed;
  top: 70px;
  color: rgba(255, 178, 56, 1);
  border: none;
  font-weight: 700;
  width: 95%;
  background-color: rgba(59, 13, 17, 1);
  border-radius: 15px;
  animation: ${searchFrames} 0.5s ease;
  box-shadow: 2px 2px 6px rgba(59, 13, 17, 1);
`;

export const SearchInput = styled.input`
  color: rgba(255, 178, 56, 1);
  border: none;
  font-weight: 700;
  width: 95%;
  background-color: rgba(59, 13, 17, 1);
  padding: 10px;
  border-radius: 15px;
  ::placeholder {
    color: rgba(255, 178, 56, 1);
    font-weight: 700;
  }
`;

export const RadioInput = styled.input`
  
`;

export const Button = styled.button`

`;

export const Span = styled.span`
  font-size: 13px;
`;

export const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
`;
