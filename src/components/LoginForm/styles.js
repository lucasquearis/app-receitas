import styled from 'styled-components';

export const LoginSection = styled.section`
  background:
         linear-gradient(
           rgba(0, 0, 0, 0.8), 
           rgba(0, 0, 0, 0.5),
           rgba(0, 0, 0, 0.3)

         ),
         url('https://images.pexels.com/photos/3434523/pexels-photo-3434523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
         background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginDiv = styled.div`
background-color: rgba(255, 255, 255, 0.8);
width: 70vw;
height: 33vh;
display: flex;
justify-content: space-around;
flex-direction: column;
align-items: center;
padding: 40px 25px 25px 25px;
border-radius: 6px;
`;

export const LoginLogo = styled.img`
  width: 60px;
  border-radius: 100px;
  transform: translateY(-84px);
  margin-bottom: -84px;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

export const Button = styled.button`
  width: 40%;
  background-color: rgb(232, 93, 4);
  color: whitesmoke;
  font-weight: 700;
  border-radius: 100px;
  border: none;
  padding: 8px 8px;
  animation: pop-in 1s;
  :disabled {
    background-color: rgba(232, 93, 4, 0.5);
  }
`;
