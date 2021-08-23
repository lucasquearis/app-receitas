import React, { useContext, useState } from 'react';
import Context from '../context/Context';

const INITIAL_STATE = {
  email: '',
  password: '',
};
function Login() {
  const [login, setLogin] = useState(INITIAL_STATE);

  const { user, setUser } = useContext(Context);

  function handleChange({ target: { name, value } }) {
    setLogin({
      ...login,
      [name]: value,
    });
  }

  function handleClick() {
    setUser({
      ...user,
      user: {
        email: login.email,
      },
    });
    setLogin(INITIAL_STATE);
  }

  function isValid() {
    const passwordLength = 7;
    const validPassword = login.password.length >= passwordLength;
    const validEmail = (/^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/i).test(login.email);
    return (validEmail && validPassword);
  }

  return (
    <div>
      <input
        data-testid="email-input"
        placeholder="Email"
        value={ login.email }
        onChange={ handleChange }
        name="email"
      />
      <input
        data-testid="password-input"
        placeholder="Senha"
        value={ login.password }
        onChange={ handleChange }
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
    </div>
  );
}

export default Login;
