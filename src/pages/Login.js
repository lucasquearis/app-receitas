import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const Validations = () => {
    const emailVerification = () => {
      const { email } = loginState;
      return emailRegex.test(email);
    };

    const SIX = 6;
    const passwordVerification = () => loginState.password.length > SIX;

    if (emailVerification() && passwordVerification() === true) {
      setDisabled(false);
    }
  };

  useEffect(() => {
    Validations();
  }, [loginState]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  return (
    <>
      <Input
        type="text"
        name="email"
        datatestId="email-input"
        placeH="Insira o seu e-mail:"
        onChange={ (e) => handleChange(e) }
      />
      <Input
        type="password"
        name="password"
        datatestId="password-input"
        placeH="Insira a sua senha:"
        onChange={ (e) => handleChange(e) }
      />
      <Button
        btnText="Entrar"
        disabled={ disabled }
        datatestId="login-submit-btn"
      />
    </>
  );
}

export default Login;
