import styled from 'styled-components';

export const CardSection = styled.div`
  width: 33vw;
  height: 12vh;
  background-color: rgb(215, 133, 33);
  border-radius: 6px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: whitesmoke;
  gap: 16px;
  border: 2px solid rgba(255,255,255,0.5);
  padding: 10px;
  animation: popout 0.5s;
`;

export const CardImg = styled.img`
width: 90px;
border-radius: 50px;
transform: translateY(-54px);
margin-bottom: -54px;
`;

export const CardH2 = styled.h2`
  font-size: 17px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin: 0 auto;
`;
