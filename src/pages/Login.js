import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const [loginState, setLoginState] = useState();
  const [disabled, setDisabled] = useState();

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

  return (
    <>
      <Input
        type="text"
        name="email-login"
        datatestId="email-input"
        placeH="Insira o seu e-mail:"
      />
      <Input
        type="password"
        name="password-login"
        datatestId="password-input"
        placeH="Insira a sua senha:"
      />
      <Button
        btnText="Entrar"
        datatestId="login-submit-btn"
      />
    </>
  );
}

export default Login;
