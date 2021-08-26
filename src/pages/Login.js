import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.css';

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
  const newBtnColor = { background: '#6ce34f', color: 'white' };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <Input
          type="email"
          testId="email-input"
          onChange={ setEmail }
          value={ email }
          id="email-id"
          holder="Email"
        />
        <Input
          type="password"
          testId="password-input"
          onChange={ setPassword }
          value={ password }
          id="pass-id"
          holder="Senha"
        />
        <Button
          testId="login-submit-btn"
          name="Entrar"
          link="/comidas"
          disabled={ checkInput() }
          onClick={ handleSubmit }
          style={ !checkInput() ? newBtnColor : {} }
        />
      </form>
    </div>
  );
}

export default Login;
