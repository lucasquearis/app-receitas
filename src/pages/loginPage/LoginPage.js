import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { saveLoginInfoLocalStorage, validateEmailPassword } from '../../functions';
import './LoginPage.css';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setDisabled(!validateEmailPassword(userEmail, password));
  }, [userEmail, password]);

  const handleBtnSubmit = (event) => {
    event.preventDefault();
    saveLoginInfoLocalStorage(userEmail);
    history.push('/comidas');
  };
  return (
    <div
      className="login-container"
    >
      <h1>LOGIN</h1>
      <form
        onSubmit={ handleBtnSubmit }
        className="form-container"
      >
        <label htmlFor="email-input">
          <input
            placeholder="E-mail"
            type="email"
            id="email-input"
            data-testid="email-input"
            name="email"
            className="input-login"
            onChange={ ({ target }) => setUserEmail(target.value) }
          />
        </label>
        <label htmlFor="password-input">
          <input
            placeholder="Senha"
            type="password"
            id="password-input"
            data-testid="password-input"
            name="password"
            className="input-login"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <Button
          variant="success"
          className="confirm-button"
          type="submit"
          disabled={ disabled }
          data-testid="login-submit-btn"
        >
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
