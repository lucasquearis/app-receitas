import React from 'react';
import Header from '../components/Header';
import '../styles/Header.css';
import Footer from '../components/Footer';
import '../styles/Footer.css';

function Profile() {
  return (
    <div>
      <Header brand="Perfil" className="img-search" />
      eu sou o perfil
      <Footer />
    </div>
  );
}

export default Profile;
