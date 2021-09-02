import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footerMenu.css';

export default function FooterMenu() {
  const { location: { pathname } } = useHistory();

  const [redirectToDrinks, setRedirectToDrinks] = useState(false);
  const [redirectToExplore, setRedirectToExplore] = useState(false);
  const [redirectToFoods, setRedirectToFoods] = useState(false);

  const handleClickDrinks = () => {
    if (pathname !== '/bebidas') {
      setRedirectToDrinks(true);
    }
  };

  const handleClickExplore = () => {
    if (pathname !== '/explorar') {
      setRedirectToExplore(true);
    }
  };

  const handleClickFoods = () => {
    if (pathname !== '/comidas') {
      setRedirectToFoods(true);
    }
  };

  if (redirectToDrinks) return <Redirect to="/bebidas" />;
  if (redirectToExplore) return <Redirect to="/explorar" />;
  if (redirectToFoods) return <Redirect to="/comidas" />;

  return (
    <footer className="footer" data-testid="footer">
      <input
        src={ drinkIcon }
        alt="Drinks Icon"
        type="image"
        data-testid="drinks-bottom-btn"
        onClick={ handleClickDrinks }
      />
      <input
        src={ exploreIcon }
        alt="Explore Icon"
        type="image"
        data-testid="explore-bottom-btn"
        onClick={ handleClickExplore }
      />
      <input
        src={ mealIcon }
        alt="Foods Icon"
        type="image"
        data-testid="food-bottom-btn"
        onClick={ handleClickFoods }
      />
    </footer>
  );
}
