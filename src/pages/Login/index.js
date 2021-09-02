/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { saveAssistent } from '../../utils';

import './styles.css';

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const emailPattern = /\S+@\S+\.\S+/;
    const minLength = 6;
    if (emailPattern.test(email) && password.length > minLength) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, password]);

  const handleSubmit = () => {
    saveAssistent('user', { email });
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/comidas');
  };

  return (
    <div>
      <h1>Le.four</h1>
      <form onSubmit={ (e) => e.preventDefault() } className="login-form">
        <FloatingLabel
          controlId="floatingInput"
          label="Email"
          className="mb-2"
        >
          <Form.Control
            value={ email }
            onChange={ ({ target: { value } }) => { setEmail(value); } }
            type="email"
            placeholder=" "
            data-testid="email-input"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            value={ password }
            onChange={ ({ target: { value } }) => { setPassword(value); } }
            type="password"
            placeholder=" "
            data-testid="password-input"
          />
        </FloatingLabel>
        <Button
          data-testid="login-submit-btn"
          type="submit"
          variant="success"
          onClick={ handleSubmit }
          disabled={ !isValid }
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}
