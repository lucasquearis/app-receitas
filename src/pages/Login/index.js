import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { getFromLocalStorage } from '../../helpers';

import { PageBackground, Main, Form, Title, Button, Logo } from './style';

import recipeLogo from './images/recipesAppLogo.svg';

function Login() {
  const {
    setDoneRecipes,
    setFavoriteRecipes,
    setInProgressRecipes,
  } = useContext(AppContext);

  const { push } = useHistory();

  const [inputLogin, setInputLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { id, value } }) => {
    setInputLogin({
      ...inputLogin,
      [id]: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: inputLogin.email }));
    setDoneRecipes(getFromLocalStorage('doneRecipes', []));
    setInProgressRecipes(getFromLocalStorage('inProgressRecipes', {
      cocktails: [],
      meals: [],
    }));
    setFavoriteRecipes(getFromLocalStorage('favoriteRecipes', []));

    push('/comidas');
  };

  const verifyLogin = () => {
    const emailVerify = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    const passwordVerify = 6;
    if (emailVerify.test(inputLogin.email)
    && passwordVerify < inputLogin.password.length) {
      return false;
    }
    return true;
  };

  return (
    <>
      <PageBackground />
      <Main>
        <Logo src={ recipeLogo } alt="recipe-logo" />
        <Title>Login</Title>
        <Form>
          <label htmlFor="email-input">
            <input
              data-testid="email-input"
              id="email"
              type="text"
              placeholder="Email"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="password-input">
            <input
              data-testid="password-input"
              id="password"
              type="password"
              placeholder="Senha"
              onChange={ handleChange }
            />
          </label>
          <Button
            data-testid="login-submit-btn"
            type="button"
            onClick={ handleClick }
            disabled={ verifyLogin() }
          >
            Entrar
          </Button>
        </Form>
      </Main>
    </>
  );
}

export default Login;
