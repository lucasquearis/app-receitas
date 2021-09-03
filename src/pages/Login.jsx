import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: '',
    disabledButton: true,
    redirect: false,
  });

  const { email, password, disabledButton, redirect } = dataLogin;

  // validação dos campos
  useEffect(() => {
    const regexEmail = /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const minPasswordLength = 6;
    const validation = !(regexEmail.test(email)
      && password.length > minPasswordLength);

    setDataLogin({
      ...dataLogin,
      disabledButton: validation,
    });
  }, [email, password]);

  const handleChangeEmail = ({ target: { value } }) => {
    setDataLogin({
      ...dataLogin,
      email: value,
    });
  };

  const handleChangePassword = ({ target: { value } }) => {
    setDataLogin({
      ...dataLogin,
      password: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setDataLogin({
      ...dataLogin,
      redirect: true,
    });
  };

  if (redirect) return <Redirect to="/comidas" />;

  return (
    <Container className="containerLogin">
      <div className="textLogin">
        <h1>Food</h1>
        <img src="https://img.icons8.com/ios-glyphs/30/000000/bug--v1.png" alt="" />
        <h1>Bugs</h1>
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label
            htmlFor="email-input"
          >
            <Form.Control
              type="email"
              data-testid="email-input"
              value={ email }
              placeholder="Email"
              onChange={ handleChangeEmail }
            />
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label
            htmlFor="password-input"
          >
            <Form.Control
              type="password"
              data-testid="password-input"
              value={ password }
              placeholder="Senha"
              onChange={ handleChangePassword }
            />
          </Form.Label>
        </Form.Group>

        <Button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabledButton }
          onClick={ handleClick }
          style={ { backgroundColor: 'black' } }
        >
          Entrar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
