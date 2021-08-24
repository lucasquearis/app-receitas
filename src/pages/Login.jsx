import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login() {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const tokensToStorage = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  };

  const emailToStorage = () => {
    const userObjctString = JSON.stringify({ email: state.email });
    localStorage.setItem('user', userObjctString);
  };

  const handleClick = (event) => {
    event.preventDefault();
    tokensToStorage();
    emailToStorage();
    history.push('/comidas');
  };

  useEffect(() => {
    const { email, password } = state;
    const emailFormat = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const MIN_PASSWORD_LENGTH = 6;
    const isValidEntries = emailFormat.test(email)
      && password.length > MIN_PASSWORD_LENGTH;

    if (isValidEntries) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [state]);

  return (
    <main>
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            name="email"
            onChange={ handleChange }
            data-testid="email-input"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            name="password"
            onChange={ handleChange }
            data-testid="password-input"
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ buttonDisabled }
          onClick={ handleClick }
        >
          Entrar
        </Button>
      </Form>
    </main>
  );
}
