import React from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import useUser from '../../hook/UseUser';
import { LoginSection, LoginDiv, LoginLogo, Button } from './styles';

const LoginForm = () => {
  const { handleChange, setTokenToLocal,
    disableBtn, redirect, minLength, user: { email, password } } = useUser();

  const emailProps = {
    name: 'email',
    id: 'email-input',
    label: 'E-mail:',
    type: 'email',
    value: email,
    helperText: 'Digite seu melhor e-mail!',
    variant: 'outlined',
    onChange: ({ target }) => handleChange(target),
    inputProps: { 'data-testid': 'email-input', autoComplete: 'off' },
  };

  const passwordProps = {
    name: 'password',
    id: 'password-input',
    label: 'Senha:',
    type: 'password',
    value: password,
    helperText: 'Pelo menos 7 digitos',
    variant: 'outlined',
    onChange: ({ target }) => handleChange(target),
    inputProps: { 'data-testid': 'password-input' },
  };

  const buttonProps = {
    disabled: disableBtn || password.length <= minLength,
    type: 'button',
    'data-testid': 'login-submit-btn',
    onClick: () => setTokenToLocal(),
  };

  if (redirect) {
    return <Redirect to="/comidas" />;
  }
  return (
    <LoginSection>
      <LoginDiv>
        <LoginLogo src="https://cdn.discordapp.com/attachments/879411496998817795/882329158007525386/H3.png" />
        <TextField { ...emailProps } />
        <TextField { ...passwordProps } />
        <Button { ...buttonProps }>
          Entrar
        </Button>
      </LoginDiv>
    </LoginSection>
  );
};

export default LoginForm;
