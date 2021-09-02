import styled from 'styled-components';

export const DetailsWrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  margin: 10px;
`;

export const Image = styled.img`
  width: 100%;
`;

export const Tittle = styled.h1`

`;

export const ShareButton = styled.button`

`;

export const Favorite = styled.button`

`;

export const Description = styled.p`

`;

export const Ingrediente = styled.ul`

`;

export const Instructions = styled.p`

`;

export const Video = styled.video`

`;

export const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 5px;
`;

export const Recomended = styled.div`
  display: ${(props) => (
    props.index === props.recIndex[0]
    || props.index === props.recIndex[1] ? 'flex' : 'none')};
  flex-shrink: 0;
  width: 50%;
  background-color: 'black';
`;

export const Title = styled.h1`
  color: red;
`;

export const rCards = styled.div`

`;

export const Start = styled.button`
  position: fixed;
  bottom: 0;
`;

export const Category = styled.h2`

`;

export const Checkbox = styled.input`
  
`;
