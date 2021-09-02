import React from 'react';
import { Container, Image } from 'react-bootstrap';
import LoginForms from '../components/LoginForms';
import rockGlass from '../images/rockGlass.svg';
import '../components/login.css';

export default function Login() {
  return (
    <Container fluid className="meals">
      <Image src={ rockGlass } alt="rocksGlass" className="rocksGlass" />
      <LoginForms />
    </Container>
  );
}
