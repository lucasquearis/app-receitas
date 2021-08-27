import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loginSubmitBtn = document.getElementsByTagName('button')[0];
    const MIN_PASSWORD_LENGTH = 7;
    // Conteudo sobre regex lido em: https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    if ((/\S+@\S+\.\S+/.test(email)) && password.length >= MIN_PASSWORD_LENGTH) {
      loginSubmitBtn.disabled = false;
    } else loginSubmitBtn.disabled = true;
  }, [email, password]);

  const handleBtnClick = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', (JSON.stringify({ email })));
  };

  return (
    <form>
      <label htmlFor="email-input">
        Email:
        <input
          data-testid="email-input"
          id="email-input"
          onChange={ ({ target: { value } }) => setEmail(value) }
          type="email"
          value={ email }
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          data-testid="password-input"
          id="password-input"
          onChange={ ({ target: { value } }) => setPassword(value) }
          type="password"
        />
      </label>
      <Link to="/comidas">
        <button
          data-testid="login-submit-btn"
          onClick={ handleBtnClick }
          type="button"
        >
          Entrar
        </button>
      </Link>
    </form>
  );
}

export default Login;
