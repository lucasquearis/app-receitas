import styled from 'styled-components';

export const HeaderSection = styled.header`
  background-color: rgba(215, 133, 33, 1);
  padding: 1vh 2vw;
  width: 96vw;
  height: 12vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ImgProfile = styled.img`
  width: 60px;
  height: 60px;
  filter: invert(1);
  border-radius: 100px;
`;

export const HeaderTitle = styled.h1`
  color: white;
  text-shadow: 2px 2px 4px black;
  text-align: center;
`;
