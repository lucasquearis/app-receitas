import React, { useState, useEffect } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const re = /\w+@\w+.com/.test(email);
    const minimumPasswordLength = 7;
    const validPassword = password.length >= minimumPasswordLength;
    const logicValidation = re && validPassword;
    setDisabled(!logicValidation);
  }, [email, password]);

  return (
    <form>
      <label htmlFor="email-input">
        E-mail
        <input
          type="email"
          id="email-input"
          data-testid="email-input"
          name="email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <label htmlFor="password-input">
          Password
          <input
            type="password"
            id="password-input"
            data-testid="password-input"
            name="password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          type="submit"
          disabled={ disabled }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </label>
    </form>
  );
};

export default LoginPage;
