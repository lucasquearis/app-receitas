import React, { useState } from 'react';
import Input from './Input';
import SubmitButton from './SubmitButton';

export default function LoginForms() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {};

  const emailInputProps = {
    testId: 'email-input',
    id: 'emailInputField',
    label: 'Login',
    name: 'email',
    onChange: ({ target: { value } }) => setEmail(value),
    placeholder: 'Digite seu email',
    type: 'email',
    value: email,
  };

  const passwordInputProps = {
    testId: 'password-input',
    id: 'passwordInputField',
    label: 'Senha',
    name: 'password',
    onChange: ({ target: { value } }) => setPassword(value),
    placeholder: 'Digite sua senha',
    type: 'password',
    value: password,
  };

  const submitButtonInputProps = {
    testId: 'login-submit-btn',
    id: 'loginButton',
    name: 'loginButton',
    onClick: handleClick,
    text: 'Entrar',
  };

  return (
    <form>
      <Input { ...emailInputProps } />
      <Input { ...passwordInputProps } />
      <SubmitButton { ...submitButtonInputProps } />
    </form>
  );
}
