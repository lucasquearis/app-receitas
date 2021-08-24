import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const history = useHistory();

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  function isValid() {
    const passwordLength = 7;
    const validPassword = password.length >= passwordLength;
    const validEmail = (
      /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/i
    ).test(email);
    return (validEmail && validPassword);
  }

  return (
    <form>
      <input
        data-testid="email-input"
        placeholder="Email"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        name="email"
      />
      <input
        data-testid="password-input"
        placeholder="Senha"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        name="password"
        type="password"
      />
      <button
        data-testid="login-submit-btn"
        onClick={ handleClick }
        type="button"
        disabled={ !isValid() }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
