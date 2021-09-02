import styled from 'styled-components';

export const DetailImg = styled.img`
  width: 100vw;
  height: 35vh;
  object-fit: cover;
  animation: slideTop 0.5s;
`;

export const DetailBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3vw;
  width: 94vw;
`;

export const DetailName = styled.h2`
  font-size: 30px;
`;

export const DetailCategory = styled.h3`
  font-size: 18px;
  color: gray;
`;

export const DetailBarIcon = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 15px;
`;

export const LeftHeroDiv = styled.div`
  width: 70vw;
`;

export const BtnDiv = styled.div`
  width: 30vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;
