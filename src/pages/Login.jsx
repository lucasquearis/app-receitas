import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

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
    <form onSubmit={ onSubmit }>
      <input
        type="email"
        value={ email }
        onChange={ (event) => setEmail(event.target.value) }
        data-testid="email-input"
      />
      <input
        type="password"
        data-testid="password-input"
        value={ password }
        onChange={ (event) => setPassword(event.target.value) }
      />

      <button
        type="submit"
        disabled={ validation }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>

    </form>
  );
}

export default Login;
