import React from 'react';

function Profile() {
  if (!localStorage.user) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
  }
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h2>Perfil</h2>
      <h4 data-testid="profile-email">{ email }</h4>
      <button data-testid="profile-done-btn" type="button">Receitas Feitas</button>
      <button data-testid="profile-favorite-btn" type="button">Receitas Favoritas</button>
      <button data-testid="profile-logout-btn" type="button">Sair</button>
    </div>
  )
}

export default Profile;
