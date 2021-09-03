import styled from 'styled-components';

export const DetailsWrapper = styled.div`  p {
    width: 100vw;
  }
  padding-bottom: 50px;
`;

export const VideoWrapper = styled.div`  width: 100vw;

  iframe {
    width: 100vw;
  }
`;

export const BtnStart = styled.button`  background-color: #34c95e;
  border: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  bottom: 0;
  box-shadow: 0 -3px #2ca64e;
  height: 40px;
  position: fixed;
  width: 100vw;

  :hover {
    box-shadow: none;
    height: 42px;
  }
`;

export const Img = styled.img`  border-radius: 20px;
  width: 100vw;
`;
