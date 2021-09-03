import styled from 'styled-components';

export const ExploreLinksContent = styled.div`
background: 
    linear-gradient(
            rgba(0, 0, 0, 0.9), 
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.6)
          ),
    ${(props) => {
    if (props.comida) {
      return 'url("https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")';
    }
    return 'url("https://content.paodeacucar.com/wp-content/uploads/2017/05/receitas-de-drinks-capa-2.jpg")';
  }};
    background-size: cover;
    padding-bottom: 30px;
  width: 100vw;
  height: 78vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: black;
  padding-top: 3vh;
`;

export const ImgExplore = styled.img`
  width: 60px;
  height: 60px;
  transform: translateY(-40px);
  margin-bottom: -40px;
  font-size: 70px;
  padding: 10px;
  background-color: rgba(215, 133, 33, 1);
  border-radius: 100px;
  color: white;
`;
