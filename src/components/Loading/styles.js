import RestaurantIcon from '@material-ui/icons/Restaurant';
import styled from 'styled-components';

export const Section = styled.section`
  width: 100vw;
  height: 86vh;
  display: flex;
  top: 0;
  justify-content: center;
  align-items: center;
  background-color: rgb(232, 93, 4);
  background:
         linear-gradient(
           rgba(232, 93, 4, 0.9), 
           rgba(232, 93, 4, 0.7),
           rgba(232, 93, 4, 0.5)
         );
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 50vw;
  height: 30vh;
`;

export const H1 = styled.h1`
  font-weight: 900;
  color: white;
`;

export const ForkAndKnife = styled(RestaurantIcon)`
  background-color: rgba(128, 15, 15, 0.9);
  border: 3px dotted white;
  padding: 20px;
  border-radius: 100px;
  animation: spin 0.8s infinite;
  color: white;
`;
