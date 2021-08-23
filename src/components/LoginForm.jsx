import React from 'react';

const LoginForm = () => (
  <section>
    <label htmlFor="email-input">
      E-mail:
      <input id="email-input" type="email" data-testid="email-input" />
    </label>
    <label htmlFor="password-input">
      Password:
      <input id="password-input" type="password" data-testid="password-input" />
    </label>
    <button type="button" data-testid="login-submit-btn">Entrar</button>
  </section>
);

export default LoginForm;
