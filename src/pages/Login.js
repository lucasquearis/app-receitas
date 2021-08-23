import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = ({ target }) => {
    const { id, value } = target;
    setUser({
      ...user,
      [id]: value,
    });
  }

  return (
    <main>
      <form>
        <Input
          label="Email:"
          type="text"
          value={ user.email }
          testId="email-input"
          id="email"
          onChange={ handleOnChange }
        />
        <Input
          label="Senha:"
          type="text"
          value={ user.password }
          testId="password-input"
          id="password"
          onChange={ handleOnChange }
        />
        <Button
          text="Entrar"
          onClick={ () => {} }
          testId="login-submit-btn"
        />
      </form>
    </main>
  );
}

export default Login;
