import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));
  const receiveEmail = email.email;
  const history = useHistory();

  const doneRecipes = () => {
    history.push('/receitas-feitas');
  };

  // npm run cy -- --spec cypress/integration/

  const favoriteRecipes = () => {
    history.push('/receitas-favoritas');
  };

  const loginPage = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Perfil" />
      <h1 data-testid="profile-email">{ receiveEmail }</h1>
      <Button
        className="profile-done-btn"
        type="submit"
        buttonText="Receitas Feitas"
        onClick={ doneRecipes }
      />
      <Button
        className="profile-favorite-btn"
        type="submit"
        buttonText="Receitas Favoritas"
        onClick={ favoriteRecipes }
      />
      <Button
        className="profile-logout-btn"
        type="submit"
        buttonText="Sair"
        onClick={ loginPage }
      />
      <Footer />
    </div>
  );
}
export default Profile;
