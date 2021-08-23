import React from 'react';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <input type="text" data-testid="email-input" placeholder="E-mail" />
      <input type="password" data-testid="password-input" placeholder="Password" />
      <button data-testid="login-submit-btn" type="button">Entrar</button>
    </div>
  );
}

export default Login;
