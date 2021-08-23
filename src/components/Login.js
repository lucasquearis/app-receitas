import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email-input">
        E-mail:
        <input
          id="email-input"
          type="email"
          data-testid="email-input"
        />
      </label>
      Password:
      <label htmlFor="password-input">
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
        />
      </label>
      <button type="button" data-testid="login-submit-btn">Entrar</button>
    </div>
  );
}

export default Login;
