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

export const TitleTextWrapper = styled.div`  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.4);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: -60px;
  padding-top: 10px;
  text-align: center;

  h1 {
    color: black;
    font-size: 24px;
    font-weight: 700;
  }

  h2 {
    color: black;
    font-size: 20px;
  }
`;

export const BtnWrapper = styled.div`  display: flex;
  justify-content: flex-end;

  input {
    margin-right: 10px;
    width: 26px;
  }
`;

export const CopyWrapper = styled.div`  display: flex;
  flex-direction: column;

  input {
    width: 26px;
  }

  h5 {
    position: absolute;
    text-align: center;
    top: 430px;
  }
`;
