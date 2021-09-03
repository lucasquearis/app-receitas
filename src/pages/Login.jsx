import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import loginValidation from '../services/loginValidation';
import actionLogin from '../redux/actions/actionLogin';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  /* handleLocalStorage com a ajuda de Camila Damásio, Grupo 10  */
  const handleLocalStorage = (emailString) => {
    localStorage.setItem('user', JSON.stringify({ email: emailString }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <Form className="form-container">
      <Form.Group className="form-group">
        <Form.Label
          htmlFor="email"
        >
          Email
          <Form.Control
            onChange={ ({ target: { value } }) => setEmail(value) }
            data-testid="email-input"
            type="email"
            placeholder="email"
            name="email"
          />
        </Form.Label>
        <Form.Label htmlFor="password" data-testid="password">
          Password
          <Form.Control
            onChange={ ({ target: { value } }) => setPassword(value) }
            type="password"
            name="password"
            placeholder="password"
            data-testid="password-input"
          />
        </Form.Label>
        <Link to="/comidas">
          <Button
            className="login-button"
            data-testid="login-submit-btn"
            disabled={ !loginValidation({ email, password }) }
            onClick={ () => {
              dispatch(actionLogin(email));
              handleLocalStorage(email);
            } }
          >
            Entrar
          </Button>
        </Link>
      </Form.Group>
    </Form>
  );
};

export default Login;
