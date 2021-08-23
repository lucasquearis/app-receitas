import React, { useState } from 'react';
import emailChecker from '../service/AuxiliaryFunctions';
import Input from './Input';
import PASSWORD_MINIMUM_LENGTH from '../service/Constants';
import SubmitButton from './SubmitButton';

export default function LoginForms() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
  };

  const emailInputProps = {
    testId: 'email-input',
    id: 'emailInputField',
    label: 'Login',
    name: 'email',
    onChange: ({ target: { value } }) => setUserEmail(value),
    placeholder: 'Digite seu email',
    type: 'email',
    value: userEmail,
  };

  const passwordInputProps = {
    testId: 'password-input',
    id: 'passwordInputField',
    label: 'Senha',
    name: 'password',
    onChange: ({ target: { value } }) => setUserPassword(value),
    placeholder: 'Digite sua senha',
    type: 'password',
    value: userPassword,
  };

  const submitButtonInputProps = {
    disabled: !(userPassword.length > PASSWORD_MINIMUM_LENGTH && emailChecker(userEmail)),
    id: 'loginButton',
    name: 'loginButton',
    onClick: handleClick,
    testId: 'login-submit-btn',
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
