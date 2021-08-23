import React, { useState, useEffect } from 'react';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState(true);

  useEffect(() => {
    const validEntries = () => {
      const minLength = 6;
      if (email.includes('@') && email.includes('.com') && password.length > minLength) {
        return setButton(false);
      }
      return setButton(true);
    };
    validEntries();
  }, [email, password, setButton]);

  const handleChange = async (handle, { target: { value } }) => {
    handle(value);
    console.log(value);
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              name="email"
              type="email"
              placeholder="Insira seu email"
              data-testid="email-input"
              onChange={ (event) => handleChange(setEmail, event) }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              name="password"
              type="password"
              placeholder="Digite sua senha"
              data-testid="password-input"
              onChange={ (event) => handleChange(setPassword, event) }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ button }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
