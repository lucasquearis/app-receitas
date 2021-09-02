import styled from 'styled-components';

export const Section = styled.section`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Div = styled.div`
  width: 87vw;
  padding: 4vw;
  background-color: white;
  border-radius: 6px;
  margin: 10px 0;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.4);
`;

export const H3 = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: ${(props) => (props.recomendado ? '4vw' : 0)}
`;

export const P = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-weight: 600;
`;

export const VideoSection = styled.div`
  width: 87vw;
  padding: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;

export const DetailBtn = styled.button`
  background-color: rgb(232, 93, 4);
  border-radius: 100px;
  border: 2px solid rgba(255,255,255,0.7);
  z-index: 100000;
  color: white;
  padding: 7px;
  justify-self: center;
  font-weight: 700;
  font-size: 16px;
  bottom: 0;
  left: 0;
  position: fixed;
  animation: popoutDetailBtn 2s;
`;
