import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';

function Profile() {
  return (
    <Link to="/perfil">
      <img src={ ProfileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
    </Link>
  );
}

export default Profile;
