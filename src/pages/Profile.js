import React from 'react';
import Footer from '../components/Footer';

function Profile() {
  const email = localStorage.getItem('email');
  return (
    <div>
      <p>Profile</p>
      <span data-testid="profile-email">{email}</span>
      <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      <button type="button" data-testid="profile-favorite-btn">Receitas Favoritas</button>
      <button type="button" data-testid="profile-logout-btn">Sair</button>
      <Footer />
    </div>
  );
}

export default Profile;
