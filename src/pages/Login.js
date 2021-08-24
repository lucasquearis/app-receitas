import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

function Login() {
  // const { history } = useHistory;
  const [inputLogin, setInputLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputLogin({
      ...inputLogin,
      [name]: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: inputLogin.email }));
  };

  const verifyPassword = () => {
    const emailVerify = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    const passwordVerify = 6;
    if (emailVerify.test(inputLogin.email)
    && passwordVerify < inputLogin.password.length) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <div>
        <h2>Olá! Digite seu usário e senha</h2>
        <form>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              onChange={ handleChange }
              type="email"
              name="email"
              placeholder="Email"
            />
          </label>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              name="password"
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="login-submit-btn"
            type="button"
            onClick={ handleClick }
            disabled={ verifyPassword() }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
