import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function checkInput() {
    const validEmail = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const validPassword = 6;
    if (validEmail.test(email) && password.length > validPassword) {
      return false;
    }
    return true;
  }

  function handleSubmit() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  }

  return (
    <form>
      <Input
        type="email"
        testId="email-input"
        onChange={ setEmail }
        value={ email }
      />
      <Input
        type="password"
        testId="password-input"
        onChange={ setPassword }
        value={ password }
      />
      <Button
        testId="login-submit-btn"
        name="Entrar"
        link="/comidas"
        disabled={ checkInput() }
        onClick={ handleSubmit }
      />
    </form>
  );
}

export default Login;
