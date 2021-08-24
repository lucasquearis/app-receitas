import React from 'react';
import { Redirect } from 'react-router-dom';
import useUser from '../../hook/UseUser';

const LoginForm = () => {
  const { handleChange, shouldRedirect,
    disableBtn, redirect, minLength, user: { email, password } } = useUser();

  if (redirect) {
    return <Redirect to="/comidas" />;
  }
  return (
    <section>
      <label htmlFor="email-input">
        E-mail:
        <input
          name="email"
          value={ email }
          id="email-input"
          type="email"
          data-testid="email-input"
          onChange={ ({ target }) => handleChange(target) }
        />
      </label>
      <label htmlFor="password-input">
        Password:
        <input
          name="password"
          value={ password }
          id="password-input"
          type="password"
          data-testid="password-input"
          onChange={ ({ target }) => handleChange(target) }
        />
      </label>
      <button
        disabled={ disableBtn || password.length <= minLength }
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => shouldRedirect() }
      >
        Entrar
      </button>
    </section>
  );
};

export default LoginForm;
