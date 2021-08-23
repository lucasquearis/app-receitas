import React from 'react';

function Login() {
  return (
    <div>
      <input
        data-testid="email-input"
      />
      <input
        data-testid="password-input"
      />
      <button
        data-testid="login-submit-btn"
      />
    </div>
  );
}

export default Login;
