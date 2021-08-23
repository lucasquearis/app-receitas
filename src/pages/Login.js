import React from 'react';
import Input from '../components/Input';

function Login() {
  return (
    <main>
      <form>
        <Input
          label="Email:"
          type="text"
          value=""
          testId="email-input"
          id="email-input"
        />
        <Input
          label="Senha:"
          type="text"
          value=""
          testId="password-input"
          id="password-input"
        />
      </form>
    </main>
  );
}

export default Login;
