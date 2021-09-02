import { createGlobalStyle } from 'styled-components';
import epilogue from '../../fonts/Epilogue/Epilogue-VariableFont_wght.ttf';

const Font = createGlobalStyle`  @font-face {
    font-family: Epilogue;
    src: url(${epilogue}) format('truetype');
  }

  body {
    font-family: Epilogue , sans-serif;
  }
`;

export default Font;
