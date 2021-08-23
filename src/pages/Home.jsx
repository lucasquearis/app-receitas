import React from 'react';

function Home() {
  return (
    <div>
      <h2>Login</h2>
      <div>
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              type="email"
              placeholder="Insira seu email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              type="email"
              placeholder="Digite sua senha"
              data-testid="password-input"
              disabled
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
