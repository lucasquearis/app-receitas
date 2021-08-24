import React, { useState } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import Header from '../components/Header';
// import AppContext from '../context/AppContext';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <h2>Olá! Digite seu usário e senha</h2>
        <form>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              onChange={ handleChange }
              type="email"
              name="email"
              placeholder={ placeholderUser }
            />
          </label>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              name="password"
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="login-submit-btn"
            type="button"
            onClick={ submit }
            disabled={ verifyPassword() }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
