import styled from 'styled-components';

export const CategoryButtons = styled.button`
  background-color: rgb(232, 93, 4);
  border-radius: 100px;
  width: 100px;
  height: 40px;
  color: white;
  font-weight: 700;
  font-size: 12px;
  word-wrap: normal;
  border: ${(props) => (props.Selected ? '1px solid white' : 'none')};
`;

export const CategorySection = styled.section`
  width: 100vw;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 10px 0;
`;
