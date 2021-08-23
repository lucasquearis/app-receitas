import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login() {
  return (
    <div>
      <TextField
        data-testid="email-input"
        id="standard-name"
        label="Email"
        // value={ email }
        // onChange={ handleChange }
      />
      <TextField
        data-testid="password-input"
        id="standard-password-input"
        label="Password"
        // value={ password }
        // onChange={ handleChange }
        type="password"
      />
      <Button
        variant="contained"
        color="primary"
        data-testid="login-submit-btn"
      >
        Entrar
      </Button>
    </div>
  );
}

export default Login;
