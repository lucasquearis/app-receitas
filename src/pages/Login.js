import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function Login() {
  const context = useContext(MainContext);
  console.log(context);

  const handleForm = ({ target: { value, id } }) => {
    console.log(id, value);
  };

  return (
    <form>
      <label htmlFor="email-input">
        Email:
        <input
          data-testid="email-input"
          id="email-input"
          onChange={ handleForm }
          type="email"
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          data-testid="password-input"
          id="password-input"
          onChange={ handleForm }
          type="password"
        />
      </label>
      <button data-testid="login-submit-btn" type="button">Entrar</button>
    </form>
  );
}

export default Login;
