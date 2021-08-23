import React, { useState } from 'react';

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [btnDisable, setBtnDisable] = useState(true);

  function handleChange({ target: { name, value } }) {
    setLoginForm({ ...loginForm, [name]: value });
  }

  return (
    <form action="">
      <label htmlFor="email-input" className="form-label">
        Email:
        <input
          id="email-input"
          data-testid="email-input"
          name="email"
          type="email"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="pass-input">
        Senha:
        <input
          id="pass-input"
          data-testid="password-input"
          name="password"
          type="password"
          onChange={ handleChange }
        />
      </label>

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ btnDisable }
        // onClick={ handleClick }
      >
        Entrar
      </button>
    </form>
  );
}
