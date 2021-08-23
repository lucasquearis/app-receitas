import React, { useContext } from 'react';
import Context from '../context/Context';

function Login() {
  const { buttonDisabled, handleInputs, user, handleClick } = useContext(Context);

  return (
    <div>
      <label htmlFor="email-input">
        E-mail:
        <input
          name="email"
          id="email-input"
          type="email"
          data-testid="email-input"
          value={ user.email }
          onChange={ handleInputs }
        />
      </label>
      Password:
      <label htmlFor="password-input">
        <input
          name="password"
          id="password-input"
          type="password"
          data-testid="password-input"
          value={ user.password }
          onChange={ handleInputs }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonDisabled.disabled }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
