import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { saveLoginInfoLocalStorage, validateEmailPassword } from '../../functions';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setDisabled(!validateEmailPassword(userEmail, password));
  }, [userEmail, password]);

  const handleBtnSubmit = (event) => {
    event.preventDefault();
    saveLoginInfoLocalStorage(userEmail);
    history.push('/comidas');
  };
  return (
    <form
      onSubmit={ handleBtnSubmit }
    >
      <label htmlFor="email-input">
        E-mail
        <input
          type="email"
          id="email-input"
          data-testid="email-input"
          name="email"
          onChange={ ({ target }) => setUserEmail(target.value) }
        />
      </label>
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
    </form>
  );
};

export default LoginPage;
