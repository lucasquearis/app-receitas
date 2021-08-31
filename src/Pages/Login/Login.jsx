import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Inp from '../../Components/Inp';
import Btn from '../../Components/Btn';
import { ContextApp } from '../../Context/ContextApp';

function Login() {
  const { handleInput, disabled, handleClick, redirect } = useContext(ContextApp);
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
      <div>
        <iframe
          width="360"
          height="202"
          src="https://www.youtube.com/embed/3npflgAdwcc"
          title="YouTube video player"
          frameBorder="0"
          allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </>
  );
}

export default Login;
