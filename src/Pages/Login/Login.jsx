import React from 'react';
import { Redirect } from 'react-router-dom';
import Inp from '../../Components/Inp';
import Btn from '../../Components/Btn';
import UseLoginHook from '../../Hooks/UseUserHook';

function Login() {
  const { handleInput, disabled, handleClick, redirect } = UseLoginHook();
  const emailProps = {
    name: 'Email',
    inputProps: {
      'data-testid': 'email-input',
    },
    label: 'Email',
    variant: 'outlined',
    type: 'Email',
    onChange: handleInput,
  };
  const passwordProps = {
    name: 'Password',
    inputProps: {
      'data-testid': 'password-input',
    },
    label: 'Password',
    variant: 'outlined',
    type: 'Password',
    onChange: handleInput,
  };
  const buttonProps = {
    name: 'Login',
    'data-testid': 'login-submit-btn',
    type: 'button',
    variant: 'contained',
    disabled,
    onClick: handleClick,
  };

  if (redirect) return <Redirect to="/comidas" />;
  return (
    <>
      <Inp { ...emailProps } />
      <Inp { ...passwordProps } />
      <Btn { ...buttonProps } />
    </>
  );
}

export default Login;
