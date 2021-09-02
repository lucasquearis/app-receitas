import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { sendUserInfo } from '../redux/actions/userActions';
import logo from '../images/logo.png';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const emailToStore = () => {
    const { email } = state;
    dispatch(sendUserInfo({ email }));
  };

  const handleClick = (event) => {
    event.preventDefault();
    emailToStore();
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
    <main className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <img src={ logo } alt="logo" className="image" />
      <Form className="w-75 d-flex flex-column justify-content-center">
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
