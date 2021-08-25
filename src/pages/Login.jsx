import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [shouldRedirect, setShould] = useState(false);

  function verifyLogin() {
    const regexEmail = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const seis = 6;
    if (regexEmail.test(email) && password.length >= seis) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleEmail({ target: { value } }) {
    setEmail(value);
    verifyLogin();
  }

  function handlePassword({ target: { value } }) {
    setPassword(value);
    verifyLogin();
  }

  function submitLogin() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setShould(true);
  }

  if (shouldRedirect) return <Redirect to="/comidas" />;

  return (
    <div>
      <form className="form">
        <input
          data-testid="email-input"
          value={ email }
          onChange={ handleEmail }
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handlePassword }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ submitLogin }
          disabled={ disabled }
        >
          Login
        </button>
      </form>
    </div>
  );
}
