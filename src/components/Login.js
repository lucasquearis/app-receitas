import React, { useState, useEffect } from 'react';

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [btnDisable, setBtnDisable] = useState(true);

  function checkValid() {
    const { email, password } = loginForm;
    const MIN_LENGTH = 7;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regex.test(email) && password.length >= MIN_LENGTH) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }

  function handleChange({ target: { name, value } }) {
    setLoginForm({ ...loginForm, [name]: value });
  }

  useEffect(checkValid, [loginForm]);

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
