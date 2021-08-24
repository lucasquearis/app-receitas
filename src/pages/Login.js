import React, { useState, useEffect, useContext } from 'react';
import { arrayOf, string } from 'prop-types';
import { Input } from '../components';
import AppContext from '../context/AppContext';
import verifyLogin from '../helpers/verifyLogin';

export default function Login({ history }) {
  const { user, setUser } = useContext(AppContext);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [btnDisable, setBtnDisable] = useState(true);

  function checkValid() {
    const { email, password } = loginForm;
    setBtnDisable(!verifyLogin(email, password));
  }

  function handleChange({ target: { name, value } }) {
    setLoginForm({ ...loginForm, [name]: value });
  }

  function handleClick() {
    const { email } = loginForm;
    setUser({ ...user, email });
    history.push('/comidas');
  }

  useEffect(checkValid, [loginForm]);

  return (
    <form action="">
      <Input
        labelText="Email:"
        type="email"
        id="email-input"
        name="email"
        onChange={ handleChange }
      />
      <Input
        labelText="Senha:"
        type="password"
        id="password-input"
        name="password"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ btnDisable }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: arrayOf(string).isRequired,
};
