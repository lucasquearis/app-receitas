import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import logo from '../images/image.png';
import '../cssPages/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    function validator() {
      const min = 6;
      const okEmail = /^[a-z0-9](\.|-|_|[a-z]|\d)+@([a-z]|\d)+\.[a-z]{2,3}(\.[a-z]{2})?$/
        .test(email);
      const validPassword = password.length > min;
      if (okEmail && validPassword === true) {
        return setValidation(false);
      }
    }
    validator();
  }, [email, password]);

  function onSubmit(event) {
    event.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setRedirect(true);
  }
  if (redirect) return <Redirect to="/comidas" />;
  return (
    <div className="loginContainer">
      <header className="loginHeader">
        <img src={ logo } alt="logo" />
      </header>
      <h1>Find your favorite recipe on iTry!</h1>
      <form onSubmit={ onSubmit } className="container">
        <div className="loginForm">
          <input
            type="email"
            className="login"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
            data-testid="email-input"
          />
          <input
            type="password"
            className="login"
            data-testid="password-input"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
          />

          <button
            className="btn"
            type="submit"
            disabled={ validation }
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
