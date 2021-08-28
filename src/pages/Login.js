import React, { useEffect, useState } from 'react';
import './pageCSS/Login.css';
import { Link } from 'react-router-dom';

// prettier-ignore
export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [btnDisabled, setBtnDisabled] = useState(true);

  function handleChange({ target: { value, name } }) {
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  }

  function handleClick() {
    function saveToStorage() {
      localStorage.setItem('mealsToken', 1);
      localStorage.setItem('cocktailsToken', 1);
      localStorage.setItem('user', JSON.stringify({ email: loginInfo.email }));
    }
    saveToStorage();
  }

  useEffect(() => {
    function isEmailValid() {
      const regex = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
      return regex.test(loginInfo.email);
    }
    function isPasswordValid() {
      const pwMinLenght = 6;
      return loginInfo.password.length > pwMinLenght;
    }

    if (isEmailValid() && isPasswordValid()) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [loginInfo]);

  return (
    <form className="pure-form">
      <fieldset>
        <label htmlFor="email-input">
          E-mail:
          <input
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ handleChange }
            value={ loginInfo.email }
          />
        </label>
        <label htmlFor="password-input">
          Password:
          <input
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ handleChange }
            value={ loginInfo.password }
          />
        </label>
        <Link to="/comidas">
          <button
            type="button"
            data-testid="login-submit-btn"
            onClick={ handleClick }
            disabled={ btnDisabled }
          >
            Login
          </button>
        </Link>
      </fieldset>
    </form>
  );
}
