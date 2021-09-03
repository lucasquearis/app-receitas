import styled from 'styled-components';

import footerBackground from './images/footerBackground.png';

export const Footer = styled.footer`  background-color: transparent;
  background-image: url(${footerBackground});
  background-size: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  bottom: 0;
  display: flex;
  height: 100px;
  justify-content: space-between;
  padding: 5px;
  padding-top: 50px;
  position: fixed;
  width: 100%;

  a {
    width: 40px;
  }

  img {
    width: 100%;
  }
`;

export default null;
