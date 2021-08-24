import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);

  const Validations = () => {
    const SIX = 6;
    const eRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, password } = loginState;

    const emailVerification = () => eRegex.test(email);

    const passwordVerification = () => password.length > SIX;

    if (emailVerification() && passwordVerification() === true) setDisabled(false);

    if (eRegex.test(email) === false || password.length <= SIX) setDisabled(true);
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

  const handleClick = () => {
    const { email } = loginState;
    const user = { email };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
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
        onClick={ () => handleClick() }
        datatestId="login-submit-btn"
      />
    </>
  );
}

export default Login;
