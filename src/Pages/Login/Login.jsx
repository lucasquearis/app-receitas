import React, { useContext } from 'react';
import Inp from '../../Components/Inp';
import Btn from '../../Components/Btn';
import { ContextApp } from '../../Context/ContextApp';

function Login() {
  const { handleInput, disabled } = useContext(ContextApp);
  const emailProps = {
    testid: 'email-input',
    name: 'Email',
    handleInput,
  };
  const passwordProps = {
    testid: 'password-input',
    name: 'Password',
    handleInput,
  };
  const buttonProps = {
    testid: 'login-submit-btn',
    name: 'Login',
    disabled,
  };
  return (
    <>
      <Inp { ...emailProps } />
      <Inp { ...passwordProps } />
      <Btn { ...buttonProps } />
    </>
  );
}

export default Login;
