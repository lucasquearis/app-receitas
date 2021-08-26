import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import LoginContext from '../Context/LoginContext';
import Input from '../Components/Forms/Input';

export default function Login() {
  const { userInfo, setUserInfo } = useContext(LoginContext);

  const handleChange = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };

  const goToAPP = () => {
    const email = JSON.stringify({ email: userInfo.email });
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', email);
    setUserInfo({ ...userInfo, redirect: true });
  };

  const validateLogin = () => {
    const { email, password } = userInfo;
    const emailValidation = /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/.test(email);
    const SIX = 6;
    return !(emailValidation && password.length >= SIX);
  };

  return (
    <div>
      { userInfo.redirect && <Redirect to="/comidas" />}
      <h1>
        Receitas
      </h1>
      <p>Título a decidir </p>
      <div className="login-container">
        <Input
          testId="email-input"
          name="email"
          placeholder="Email"
          value={ userInfo.email }
          handleChange={ handleChange }
        />
        <Input
          type="password"
          name="password"
          testId="password-input"
          placeholder="Senha"
          value={ userInfo.password }
          handleChange={ handleChange }
        />
      </div>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ validateLogin() }
        onClick={ goToAPP }
      >
        Entrar
      </button>
    </div>
  );
}
