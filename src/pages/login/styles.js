import styled from 'styled-components';

export const Main = styled.main` align-items: center;
  background:
  linear-gradient(0deg, rgba(0, 0, 0, 0.8),
  rgba(0, 0, 0, 0.8)), url('/loginBackground.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding-top: 75px;
`;

export const Form = styled.form` display: flex;
  flex-direction: column;
  width: 250px;
  color: rgba(251, 255, 254, 1);
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Label = styled.label` display: flex;
`;

export const Button = styled.button` width: 200px;
  border-radius: 30px;
  background-color: rgba(255, 178, 56, 1);
  border: none;
  padding: 10px;
  box-shadow: 1px solid black;
  font-weight: 700;
`;

export const Input = styled.input` width: 300px;
  color: rgba(255, 178, 56, 1);
  border-color: rgba(255, 178, 56, 1);
  padding: 10px;
  border-radius: 30px;
  background-color: transparent;
  ::placeholder {
    color: rgba(255, 178, 56, 1);
  }
`;

export const P = styled.span`
  color: white;
  font-size: 17px;
  font-weight: 300;
`;

export const Span = styled.span`
  color: rgba(188, 57, 8, 1);
  font-size: 13px;
  font-weight: 700;
`;

export const Gif = styled.img`
  width: 100px;
`;
