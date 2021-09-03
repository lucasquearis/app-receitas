import styled from 'styled-components';

export const CardSection = styled.section`
  width: 33vw;
  height: 17vh;
  background-color: rgb(215, 133, 33);
  border-radius: 6px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border: 2px solid rgba(255,255,255,0.5);
  padding: 10px;
  animation: popout 0.5s;
`;

export const CardImg = styled.img`
width: 90px;
border-radius: 50px;
transform: translateY(-50px);
margin-bottom: -50px;
`;

export const CardH2 = styled.h2`
  font-size: 17px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
  color: white;
`;

export const P = styled.p`
  font-size: 12px;
  font-weight: 800;
  word-break: break-all;
  display: -webkit-box;
  text-align: center;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin: 0 auto;
  color: whitesmoke;
`;

export const Button = styled.button`
  background-color: rgb(215, 133, 33);
`;

export const ButtonDiv = styled.div`
  display: flex;
  padding: 10px 0;
  width: 100%;
  justify-content: space-between;
`;
