import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Inp from '../../Components/Inp';
import Btn from '../../Components/Btn';
import { ContextApp } from '../../Context/ContextApp';

import './Login.css';

function Login() {
  const { handleInput, disabled, handleClick, redirect } = useContext(ContextApp);
  const emailProps = {
    name: 'Email',
    inputProps: {
      'data-testid': 'email-input',
    },
    label: 'Email',
    className: 'email',
    variant: 'standard',
    type: 'Email',
    onChange: handleInput,
  };
  const passwordProps = {
    name: 'Password',
    inputProps: {
      'data-testid': 'password-input',
    },
    label: 'Password',
    className: 'password',
    variant: 'standard',
    type: 'Password',
    onChange: handleInput,
  };
  const buttonProps = {
    name: 'Login',
    'data-testid': 'login-submit-btn',
    type: 'button',
    className: 'button',
    variant: 'contained',
    disabled,
    onClick: handleClick,
  };

  if (redirect) return <Redirect to="/comidas" />;
  return (
    <div className="page-login">
      <div className="login-form">
        <div className="title">
          <img src="https://image.flaticon.com/icons/png/512/3448/3448167.png" alt="logo" />
          <h2>Fast Recipe</h2>
        </div>
        <Inp { ...emailProps } />
        <Inp { ...passwordProps } />
        <Btn { ...buttonProps } />
      </div>
    </div>
  );
}

export default Login;
