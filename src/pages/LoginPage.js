import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import setLocalStorage from '../services/setLocalStorage';

export default function LoginPage() {
  const [redirectToFoods, setRedirectToFoods] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const { email, password } = userInfo;

  const handleChange = ({ target: { value, name } }) => {
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailStorage = JSON.stringify({ email });
    localStorage.setItem('user', emailStorage);
    setLocalStorage();
    setRedirectToFoods(true);
  };

  const handleValidation = () => {
    const validateEmail = /(.*)@(.*).com/;
    const SIX = 6;
    return (validateEmail.test(email) && password.length > SIX);
  };

  if (redirectToFoods) {
    return <Redirect to="/comidas" />;
  }
  return (
    <form>
      <input
        type="email"
        data-testid="email-input"
        placeholder="Email"
        onChange={ handleChange }
        name="email"
        value={ email }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Senha"
        onChange={ handleChange }
        name="password"
        value={ password }
      />
      <button
        type="button"
        disabled={ !handleValidation() }
        onClick={ handleClick }
        data-testid="login-submit-btn"
      >
        Login
      </button>
    </form>
  );
}
