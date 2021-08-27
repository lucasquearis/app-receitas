import React from 'react';
import '../CSS/Footer.css';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <button
        src="../images/drinkIcon.svg"
        className="drinks-botton"
        aria-label="drinks-botton"
        name="drinks-botton"
        type="button"
        data-testid="drinks-bottom-btn"
      />
      <button
        src="../images/exploreIcon.svg"
        className="explore-botton"
        aria-label="explore-bottom"
        name="explore-bottom"
        type="button"
        data-testid="explore-bottom-btn"
      />
      <button
        src="../images/mealIcon.svg"
        className="food-botton"
        aria-label="food-bottom"
        name="food-bottom"
        type="button"
        data-testid="food-bottom-btn"
      />
    </footer>
  );
}
