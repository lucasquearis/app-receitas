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
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
