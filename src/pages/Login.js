import React, { useState, useEffect, useContext } from 'react';
import { Input, Button } from '../components';
import AppContext from '../context/AppContext';
import verifyLogin from '../helpers/verifyLogin';

export default function Login() {
  const { setUser } = useContext(AppContext);
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
    setUser({ email });
    localStorage.setItem('user', JSON.stringify({ email }));
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
      <Button
        className="login-submit-btn"
        type="button"
        buttonText="Entrar"
        pathname="/comidas"
        isDisable={ btnDisable }
        onClick={ handleClick }
      />
    </form>
  );
}
