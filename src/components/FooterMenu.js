import React from 'react';

function FooterMenu() {
  return (
    <div data-testid="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
      >
        <img />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
      >
        <img />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
      >
        <img />
      </button>
    </div>
  );
}

export default FooterMenu;
