import React from 'react';

function Login() {
  return (
    <>
      <h1>Login</h1>
      <form>
        <label htmlFor="email-input">
          Email
          <input data-testid="email-input" id="email-input" type="text" />
        </label>
        <label htmlFor="password-input">
          Senha
          <input data-testid="password-input" id="password-input" type="password" />
        </label>
        <button data-testid="login-submit-btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
